const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/tokenmanagement');



const Mutation = {
  addMessage: async (_, { input }, ctx) => {
   
    const message = await ctx.models.message.create(input);
    return message;
  },
  addUser: async (_,{input}, ctx) => {
    const hashPassword = await bcrypt.hashSync(input.password, 3);
    const hashConfirmPassword= await bcrypt.hashSync(input.confirmPassword, 3);
    const agency= await ctx.models.Agency.create(input.agency) ;
    const car= await ctx.models.Car.create(input.car) ;
    const user=  await ctx.models.User.create({...input,agency: [agency._id], password:hashPassword, confirmPassword: hashConfirmPassword}, );

    const token = await generateToken(user);
    if (input.password == input.confirmPassword) {
    return {...user._doc, agency: [agency],car: [car], token};
  }
  else
  throw new Error('Wrong Password');
  
  },
  addAgency: async (_,{ input }, ctx) => {
    const car = await ctx.models.Car.create(input.car);
    const agence = await ctx.models.Agency.create({...input, car: [car._id]});
    return {...agence._doc, car: [car]};
  },

  addCar: async (_,{input}, ctx) => {
    const agencyCar = await ctx.models.Agency.findOne({name: input.agency})
    const agency = await agencyCar.toJSON();
  
    const car = await ctx.models.Car.create({...input, agency: [agency._id] });
    await ctx.models.Agency.findByIdAndUpdate(
      agency._id,
      { $push: { car: car._id } },
      { new: true, useFindAndModify: false }
    );
    return {...car._doc, agency:agency};
  },

  login: async (_,{input}, ctx) => {
    const currentUser = await ctx.models.User.findOne({email: input.email}).lean();
    if (!currentUser) {
      throw new Error('User Not Found');
    }
    if (!bcrypt.compareSync(input.password, currentUser.password)) {
      throw new Error('Mauvais mot de passe');
    }
    const token = await generateToken(currentUser);
    return{
      token,
      id: currentUser._id,
      ...currentUser
    }

  },
  updateUser: async (_, { input,input: { id } },ctx) => {
    const newUser = await ctx.models.User.findByIdAndUpdate( id , {
      $set: {
     ...input
      }
    }, {new: true});
    return newUser;
  }, 
  updateAgency: async (_, {input, input:{id}}, ctx) => {
    const newAgency = await ctx.models.Agency.findByIdAndUpdate(id, {
      $set: {
        ...input
      }
    }, {new: true});
    return newAgency
  },
  updateCar: async (_, { input,input: { id } },ctx) => {
    const newCar = await ctx.models.Car.findByIdAndUpdate( id , {
      $set: {
     ...input
      }
    }, {new: true});
    return newCar;
  }, 
  removeUser: async (_,{id}, ctx)=> {
    await ctx.models.User.findByIdAndRemove(id);
    return true;
  },
  removeAgency: async (_,{id}, ctx) => {
    await ctx.models.Agency.findByIdAndRemove(id)
    return true;
  },
  removeCar: async (_,{id}, ctx)=> {
    const {agency: [agency =''] = []} = await ctx.models.Car.findOne({_id:id})
    await ctx.models.Car.findByIdAndRemove(id);
    await ctx.models.Agency.findByIdAndUpdate(
      agency,
      { $pull: { car: id } },
      { new: true, useFindAndModify: false }
    );
    return true;
  },
  
  

};


module.exports = Mutation;
