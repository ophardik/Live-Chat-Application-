const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require("../model/userModel")

const signup=async(req,res)=>{
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log("Request body",req.body)

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
  
        const user = await User.findOne({ username });
  
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
      
        const hashedPassword = await bcrypt.hash(password, 10);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        return res.status(200).json({
            msg:"Signed Up successfully",
            success:"true"
        })


    } catch (error) {
        console.log("Error in signup contoller",error)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log("Request Body", req.body);

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Username does not exist" });
        }
        // console.log("password",password)

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Password is incorrect" });
        }
       // console.log("isPasswordMatch",isPasswordMatch)

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            });

    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            msg:"User loggedOut Successfully",
            success:"true"
        })
    } catch (error) {
        console.log("Error in logout contoller",error)
    }
}

const getOtherUser=async(req,res)=>{
    try {
        const loggedInUserId=req.id
        // console.log("loggedInUserId",loggedInUserId)

        const otherUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log("Error in getting users",error)
    }
}


module.exports={
    signup,
    login,
    logout,
    getOtherUser
}