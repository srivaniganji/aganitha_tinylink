const pool = require("../config/db");
const generateShortCode = require("../utils/generate.util");
const linkService = require("../services/link.service");

const getAllLinks = async (req, res) => {
  try {
    const result = await linkService.getAllLinks();
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch error: ", error);
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

const createLink = async (req, res) => {
  const { url, customCode } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Url is required" });
  }

  let shortCode = customCode?.trim() || generateShortCode();

  try {
    if (customCode) {
      const customCodeRes = await linkService.findByShortCode(customCode);

      if (customCodeRes.rows.length > 0) {
        return res.status(400).json({ error: "Custom code already used" });
      }
    }

    const urlRes = await linkService.findByTargetLink(url);

    if (urlRes.rows.length > 0) {
      return res.status(409).json({ error: "Url already exists" });
    }

    const result = await linkService.createLink(url, shortCode);

    return res
      .status(200)
      .json({ message: "ShortUrl created", data: result.rows });
  } catch (error) {
    console.error("Error creating the shortcode:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getLinkStats = async (req, res) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({ error: "Shortcode is required" });
  }

  try {
    const link = await linkService.getLinkByCode(code);

    if (link.rows.length === 0) {
      return res.status(404).json({ error: "Shortcode not found" });
    }

    await linkService.incrementClicksandTime(code);
    return res.redirect(link.rows[0].target_link);
  } catch (error) {
    console.error("Error getting link:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteLink = async (req, res) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({ error: "Shortcode is required" });
  }

  try {
    const deleted = await linkService.deleteByCode(code);

    if (!deleted) {
      return res.status(404).json({ error: "Shortcode not found" });
    }

    return res.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllLinks, createLink, getLinkStats, deleteLink };
