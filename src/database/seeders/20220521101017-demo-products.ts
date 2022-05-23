const Slug = require("slug");

module.exports = {
  //@ts-ignore
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "products",
      [
        {
          title: "Shoes",
          description: "Shoes for men and women",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653128527/CLOVECORE4954copy_orwuyg.jpg",
          slug: Slug(`${"shoe"} ${Date.now()}`),
          price: 56,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Laptop",
          description: "Personal Laptop Computers",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653128623/peripherals_laptop_latitude_3320_gallery_1_lscoaa.jpg",
          slug: Slug(`${"laptop"} ${Date.now()}`),
          price: 500,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Women Shirt",
          description: "Shirt for Women",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653128592/3eae54e3-7c38-4a4d-8eea-cb2215da946e_u0lznt.jpg",
          slug: Slug(`${"women-shirt"} ${Date.now()}`),
          price: 30,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Men Shirt",
          description: "Shirt for Men",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653129943/0_Luxury-Black-Gold-Shirt-2019-Autumn-Baroque-Men-Shirt-Long-Sleeve-Patchwork-Casual-Shirt-Men-Slim_nsivzl.jpg",
          slug: Slug(`${"men-shirt"} ${Date.now()}`),
          price: 25,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Phones",
          description: "Phones for sale",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653130106/01pr6hmgqz7A5wX5hSQWqRs-1.fit_lim.size_625x365.v1632764534_bvgnqw.jpg",
          slug: Slug(`${"phones"} ${Date.now()}`),
          price: 100,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Women handbag",
          description: "Women handbags for sale",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653130207/1348757_hvvado.png",
          slug: Slug(`${"women-handbag"} ${Date.now()}`),
          price: 50,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Watch",
          description: "Wrist watch",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653130383/71VjM5LOeYL._AC_UL1500__olbqfo.jpg",
          slug: Slug(`${"watch"} ${Date.now()}`),
          price: 20,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Eye glasses",
          description: "Eye Glasses for sale",
          imageUrl:
            "https://res.cloudinary.com/divfoifrs/image/upload/v1653130405/pl6605.jpg_cayut0.jpg",
          slug: Slug(`${"eyeglasses"} ${Date.now()}`),
          price: 20,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {}
    ),

  //@ts-ignore
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("products", null, {}),
};
