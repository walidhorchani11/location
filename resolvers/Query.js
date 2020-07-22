const Query = {
  messages: async (_, __, ctx) => {
    const messages = await ctx.models.message.find({}).exec();
    return messages;
  },

  users: async (_, __, ctx) => {
    const users = await ctx.models.User.find({}).populate('agency').exec();
    return users;
  },
  user: async (_, { userId }, ctx) => {
    const userById = await ctx.models.User.findById(userId).populate({
      path: 'agency',
      populate: { path: 'car' },
    });
    const user = userById.toJSON();
    console.log('carsss:::', user.agency[0].car);
    return {
      ...user,
      id: user._id,
      agency: { ...user.agency[0], car: [...user.agency[0].car] },
    };
  },
  agencies: async (_, __, ctx) => {
    const agencies = await ctx.models.Agency.find({}).exec().populate('cars');
    return agencies;
  },

  agency: async (_, { agencyId }, ctx) => {
    const agencyById = await ctx.models.Agency.findById(agencyId)
      .populate('car')
      .exec();
    return agencyById;
  },
  cars: async (_, __, ctx) => {
    const cars = await ctx.models.Car.find({}).exec();
    return cars;
  },
  car: async (_, { carId }, ctx) => {
    const car = await ctx.models.Car.findById(carId).populate('agency');
    return car, { id: _id };
  },
};

module.exports = Query;
