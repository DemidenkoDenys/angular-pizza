export interface PizzaInterface {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly price: number;
}

export const pizzas: PizzaInterface[] = [
  {
    name: 'Неаполитано',
    description: 'Неаполитанская пицца – одна из самых популярных во всем мире. Понравится абсолютно всем ценителям итальянской кухни.',
    url: '../img/pizza/1.png',
    price: 100
  },
  {
    name: 'Вегетариано',
    description: 'Пицца для вегетарианцев. Отсутствие мяса и обилие полезных для организма продуктов делают пиццу "Вегетариано" одной из самых востребованных',
    url: '../img/pizza/2.png',
    price: 80
  },
  {
    name: 'Итальяни',
    description: 'Приготовленная по изысканных итальянских рецептам с добавлением пармезана, арборио и приправ.',
    url: '../img/pizza/3.png',
    price: 120
  },
  {
    name: 'Куриная',
    description: '',
    url: '../img/pizza/4.png',
    price: 110
  },
  {
    name: 'Фирменная',
    description: '',
    url: '../img/pizza/5.png',
    price: 210
  },
  {
    name: 'Маринара',
    description: '',
    url: '../img/pizza/6.png',
    price: 150
  },
  {
    name: 'Грибная',
    description: '',
    url: '../img/pizza/7.png',
    price: 90
  },
  {
    name: 'Frutti di Mare',
    description: '',
    url: '../img/pizza/8.png',
    price: 220
  },
  {
    name: 'Маргарина',
    description: '',
    url: '../img/pizza/9.png',
    price: 70
  },
  {
    name: 'Милликано',
    description: '',
    url: '../img/pizza/10.png',
    price: 180
  },
  {
    name: 'Капричоза',
    description: '',
    url: '../img/pizza/11.png',
    price: 190
  }
]
