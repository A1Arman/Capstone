const getHealth = async (req, res) => {
    try {
      res.status(200).json('LIVE')
    } catch (error) {
      res.status(500).json({ message: 'Health probe failed', error });
    }
  }

module.exports = {
    getHealth
  };
  