const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')

const userSchema =  new mongoose.Schema(
    {
        name: { type : String , required :true },
        email: { type : String , required :true , unique:true },
        phoneNumber: { type : String , required :true },
        password: { type : String , required :true  },
        confirmPassword: { type : String , required :true },
    },{timestamps:true}
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("confirmPassword")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,salt)
})


userSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User",userSchema);