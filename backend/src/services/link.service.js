const pool = require("../config/db");

const getAllLinks = async () => {
  const result = await pool.query("SELECT * FROM links ORDER BY id DESC");
  return result;
};

const findByShortCode = async (code) => {
  const result = await pool.query(
    `SELECT shortcode FROM links WHERE shortcode = $1`,
    [code]
  );
  return result;
};

const findByTargetLink = async (url) => {
  const result = await pool.query(
    `SELECT target_link FROM links WHERE target_link = $1`,
    [url]
  );
  return result;
};

const createLink = async (url, shortCode) => {
  const result = await pool.query(
    `INSERT INTO links (shortcode, target_link) VALUES ($1, $2) RETURNING shortcode`,
    [shortCode, url]
  );
  return result;
};

const getLinkByCode = async (code) => {
  const result = await pool.query(
    `SELECT target_link FROM links WHERE shortcode = $1`,
    [code]
  );
  return result;
};

const incrementClicks = async (code) => {
  await pool.query(
    `UPDATE links SET total_clicks = total_clicks + 1 WHERE shortcode = $1`,
    [code]
  );
};

const deleteByCode = async (code) => {
  const result = await pool.query(
    `DELETE FROM links WHERE shortcode = $1 RETURNING *`,
    [code]
  );
  return result;
};

module.exports = {
  getAllLinks,
  findByShortCode,
  findByTargetLink,
  createLink,
  getLinkByCode,
  deleteByCode,
  incrementClicks,
};
