const { createItem, getItem, getItemsForDay, deleteItem } = require('../services/dynamoDbService');

// Create a new activity
exports.createActivity = async (req, res) => {
  try {
    const { userId, endDate, data } = req.body;

    if (!userId || !endDate || !data) {
      return res.status(400).json({ error: 'userId, endDate, and data are required' });
    }

    const newItem = {
      PK: `USER#${userId}`,
      SK: `ACTIVITY#${endDate}`,
      data,
    };

    const result = await createItem(newItem);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an activity by PK and SK
exports.getActivity = async (req, res) => {
  try {
    const { pk, sk } = req.params;

    if (!pk || !sk) {
      return res.status(400).json({ error: 'PK and SK are required' });
    }

    const item = await getItem(pk, sk);
    res.status(200).json(item);
  } catch (error) {
    if (error.message === 'Item not found') {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all activities for a specific day
exports.getActivitiesForDay = async (req, res) => {
  try {
    const { userId, endDate } = req.params;

    if (!userId || !endDate) {
      return res.status(400).json({ error: 'User ID and endDate are required' });
    }

    // Construct the PK dynamically
    const pk = `USER#${userId}`;

    const items = await getItemsForDay(pk, endDate);
    if (items.length === 0) {
      return res.status(404).json({ message: 'No activities found for the given day' });
    }

    // Extract only the `data` field from each item
    const transformedItems = items.map(item => item.data);

    res.status(200).json(transformedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an activity by PK and SK
exports.deleteActivity = async (req, res) => {
  try {
    const { userId, endDate } = req.params;

    if (!userId || !endDate) {
      return res.status(400).json({ error: 'User ID and endDate are required' });
    }

    // Construct the PK dynamically
    const pk = `USER#${userId}`;
    const sk = `ACTIVITY#${endDate}`;

    const result = await deleteItem(pk, sk);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};