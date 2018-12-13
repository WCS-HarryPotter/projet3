import glacage_citron from '../Assets/Images/glacage_citron.png';
import glacage_fraise from '../Assets/Images/glacage_fraise.png';
import glacage_chocolat from '../Assets/Images/glacage_chocolat.png';


export default () => {
  return [
    {
      id: 1,
      name: 'Cream cheese',
      type: 'Glaçage',
      size: 'S',
      price: 4,
      dispo: true,
      info: 'some info',
      img: glacage_fraise,
      allerg: '',
      compatible: ['Noisettes'],
    },
    {
      id: 2,
      name: 'Ganache chocolat',
      type: 'Glaçage',
      size: 'M',
      price: 5,
      dispo: true,
      info: 'some info',
      img: glacage_fraise,
      allerg: '',
      compatible: ['Dentelles chocolat', 'Noix', 'Crumble', 'Fraise'],
    },
    {
      id: 3,
      name: 'Ganache caramel',
      type: 'Glaçage',
      size: 'XL',
      price: 6,
      dispo: true,
      info: 'some info',
      img: glacage_fraise,
      allerg: '',
      compatible: ['Dentelles chocolat', 'Crumble'],
    },
    {
      id: 4,
      name: 'Glaçage citron',
      type: 'Glaçage',
      size: 'S',
      price: 2,
      dispo: true,
      info: 'some info',
      img: glacage_citron,
      allerg: 'gluten',
      compatible: 'remplissage citron',
    },
    {
      id: 4,
      name: 'Glaçage citron',
      type: 'Glaçage',
      size: 'M',
      price: 3,
      dispo: true,
      info: 'some info',
      img: glacage_citron,
      allerg: 'gluten',
      compatible: 'remplissage citron',
    },
    {
      id: 6,
      name: 'Glaçage citron',
      type: 'Glaçage',
      size: 'XL',
      price: 4,
      dispo: true,
      info: 'some info',
      img: glacage_citron,
      allerg: 'gluten',
      compatible: 'remplissage citron',
    },
    {
      id: 7,
      name: 'Glaçage chocolat',
      type: 'Glaçage',
      size: 'S',
      price: 2,
      dispo: true,
      info: 'some info',
      img: glacage_chocolat,
      allerg: 'gluten',
      compatible: 'garniture orange',
    },
    {
      id: 8,
      name: 'Glaçage chocolat',
      type: 'Glaçage',
      size: 'M',
      price: 3,
      dispo: true,
      info: 'some info',
      img: glacage_chocolat,
      allerg: 'gluten',
      compatible: 'garniture orange',
    },
    {
      id: 9,
      name: 'Glaçage chocolat',
      type: 'Glaçage',
      size: 'XL',
      price: 5,
      dispo: true,
      info: 'some info',
      img: glacage_chocolat,
      allerg: 'gluten',
      compatible: 'garniture orange',
    },
  ];
};
