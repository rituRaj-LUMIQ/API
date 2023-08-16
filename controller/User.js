const User = require("../Models/User");

exports.createUser = async (req, res) => {
  const {
    name,
    age,
    email,
    gender,
    mobileNumber,
    birthday,
    city,
    state,
    country,
    address1,
    address2,
  } = req.body;
  try {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Invalid email format",
        data: null,
      });
    }

    if (!/\d{10}/.test(mobileNumber)) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Invalid mobile number length!",
        data: null,
      });
    }

    if (
      !/^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-(\d{4})$/.test(birthday)
    ) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Invalid birthday pattern!",
        data: null,
      });
    }

    if (age <= 18) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Age should be greater then 18!",
        data: null,
      });
    }
    const newUser = await User.create({
      name,
      age,
      email,
      gender,
      mobileNumber,
      birthday,
      city,
      state,
      country,
      address1,
      address2,
    });

    res.status(200).json({
      code: 200,
      message: "User created successfully",
      error: false,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "Bad Request",
      error: error.message,
      data: null,
    });
  }
};

exports.findUser = async (req, res) => {
  const { email } = req.query;
  try {
    const newUser = await User.findOne({ email });

    if (!newUser) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "user not Found ",
        data: null,
      });
    }

    res.status(200).json({
      code: 200,
      message: "User found",
      error: false,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "Bad Request",
      error: error.message,
      data: null,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.query;
  try {
    const findUser = await User.findOne({ email });
    if(!findUser){
        return res.status(400).json({
            code: 400,
            message: "Bad Request",
            error: 'User Not Found',
            data: null,
          });
    }
    const newUser = await User.deleteOne({ email });

    res.status(200).json({
      code: 200,
      message: "User deleted successfully",
      error: false,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "Bad Request",
      error: error.message,
      data: null,
    });
  }
};

exports.updateUser = async (req, res) => {
  const {
    name,
    age,
    email,
    gender,
    mobileNumber,
    birthday,
    city,
    state,
    country,
    address1,
    address2,
  } = req.body;

  try {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Invalid email format",
        data: null,
      });
    }

    if (!/\d{10}/.test(mobileNumber)) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Invalid mobile number length!",
        data: null,
      });
    }

    if (
      !/^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-(\d{4})$/.test(birthday)
    ) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Invalid birthday pattern!",
        data: null,
      });
    }

    if (age <= 18) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "Age should be greater then 18!",
        data: null,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        error: "User not Found",
        data: null,
      });
    }

    const newUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        age,
        email,
        gender,
        mobileNumber,
        birthday,
        city,
        state,
        country,
        address1,
        address2,
      }
    );

    const updatedUser = await User.findOne({ email });

    res.status(200).json({
      code: 200,
      message: "User updated successfully",
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "Bad Request",
      error: error.message,
      data: null,
    });
  }
};
