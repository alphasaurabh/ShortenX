const STATS_DOC_ID = "global";

function getStatsCollection(collections) {
  return collections.statsCollection;
}

function getQrEventsCollection(collections) {
  return collections.qrEventsCollection;
}

function getUrlsCollection(collections) {
  return collections.urlsCollection;
}

function normalizeCount(value) {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

async function countLinks(collections) {
  return getUrlsCollection(collections).countDocuments({ shorturl: { $exists: true } });
}

export function createStatsService(collections) {
  return {
    async incrementLinkCreated() {
      await getStatsCollection(collections).updateOne(
        { _id: STATS_DOC_ID },
        {
          $inc: { totalLinksCreated: 1 },
          $setOnInsert: { totalQRCodesGenerated: 0, linksSeeded: false },
        },
        { upsert: true }
      );

      return true;
    },

    async recordQrGenerated(eventKey, metadata = {}) {
      const normalizedEventKey = typeof eventKey === "string" ? eventKey.trim() : "";
      if (!normalizedEventKey) {
        return { tracked: false, duplicate: false };
      }

      try {
        await getQrEventsCollection(collections).insertOne({
          _id: normalizedEventKey,
          shortUrl: typeof metadata.shortUrl === "string" ? metadata.shortUrl : "",
          createdAt: new Date(),
        });
      } catch (error) {
        if (error && error.code === 11000) {
          return { tracked: false, duplicate: true };
        }

        throw error;
      }

      await getStatsCollection(collections).updateOne(
        { _id: STATS_DOC_ID },
        {
          $inc: { totalQRCodesGenerated: 1 },
          $setOnInsert: { totalLinksCreated: 0, linksSeeded: false },
        },
        { upsert: true }
      );

      return { tracked: true, duplicate: false };
    },

    async getDashboardStats() {
      const statsCollection = getStatsCollection(collections);
      const existingStats = await statsCollection.findOne({ _id: STATS_DOC_ID });

      if (!existingStats) {
        const totalLinksCreated = await countLinks(collections);
        await statsCollection.insertOne({
          _id: STATS_DOC_ID,
          totalLinksCreated,
          totalQRCodesGenerated: 0,
          linksSeeded: true,
        });

        return {
          totalLinksCreated,
          totalQRCodesGenerated: 0,
        };
      }

      const shouldSeedLinks = existingStats.linksSeeded !== true;
      const fallbackLinksCount = shouldSeedLinks ? await countLinks(collections) : normalizeCount(existingStats.totalLinksCreated);
      const totalLinksCreated = normalizeCount(existingStats.totalLinksCreated);
      const totalQRCodesGenerated = normalizeCount(existingStats.totalQRCodesGenerated);

      if (shouldSeedLinks || !Number.isFinite(existingStats.totalQRCodesGenerated)) {
        const patch = {};

        if (shouldSeedLinks) {
          patch.totalLinksCreated = Math.max(totalLinksCreated, fallbackLinksCount);
          patch.linksSeeded = true;
        }

        if (!Number.isFinite(existingStats.totalQRCodesGenerated)) {
          patch.totalQRCodesGenerated = 0;
        }

        if (Object.keys(patch).length > 0) {
          await statsCollection.updateOne({ _id: STATS_DOC_ID }, { $set: patch });
        }
      }

      return {
        totalLinksCreated: shouldSeedLinks ? Math.max(totalLinksCreated, fallbackLinksCount) : totalLinksCreated,
        totalQRCodesGenerated,
      };
    },
  };
}
