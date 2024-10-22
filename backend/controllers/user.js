const User = require("../models/user");

const handleGetUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // This line is very important here we will finding all the user, except of the loggedInUser, this command meaning is that find all the users in user model which is not equal to loggedInUserId, it is like filtering the data of the model, we apply condition in our id searching {$ne: loggedInUserId} using this
    // after finding al the user we use .select() method to select the data which we want to show in the sidebar, if we give "-password" then it will exclude the password from the result, and except of password other all the data will be shown in the sidebar.
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); 

    return res.status(200).json(filteredUsers);

  } catch (error) {
    console.log(
      "Error in handleGetUsersForSidebar controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleGetUsersForSidebar,
};
