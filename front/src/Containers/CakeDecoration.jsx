import React from 'react';

const CakeDecoration = (cake, customWishes, user) => {
  const render = [];
  let description = '';
  console.log("cake", cake, Array.isArray(cake));
  if (cake.type === 'cake') description = `1 ${cake.type} de ${cake.story} étage(s) pour ${cake.size} personnes`;
  else if (cake.type === 'cheesecake') description = `1 ${cake.type} pour 16 personnes`;
  else description = `${cake.quantity} ${cake.type} en taille ${cake.size}`;

  let ingredientsList = '';
  if (Array.isArray(cake.ingredients)) {
    cake.ingredients.map((ingredient) => {
      if (ingredient.type === 'Base') {ingredientsList += `${ingredient.name}
`;}
      else {ingredientsList += `${ingredient.type}: ${ingredient.name}
`;}
    });
  } else ingredientsList = cake.ingredients;

  let decoration = '';
  let cakeDeco = {};
  if (customWishes) cakeDeco = customWishes;
  else cakeDeco = cake;
  console.log("cakeDeco", cakeDeco)
  if (cakeDeco.deco1 === '' && cakeDeco.deco2 === '') decoration = 'Aucune décoration';
  if (cakeDeco.deco1 === 'message' || cakeDeco.deco2 === 'message') {
    decoration = (
      <div>
        Message :
        {' '}
        <span
          style={{ color: cakeDeco.msgColor, backgroundColor: cakeDeco.msgBgColor, fontFamily: cakeDeco.font }}
        >
          {cakeDeco.msgContent}
        </span>
      </div>
    );
  }
  if (cakeDeco.deco1 === '2D' || cakeDeco.deco1 === '3D') {
    const photo = (`../../../back/tmp/${cakeDeco.photo1}`);
    decoration = (
      <div>
        <p>Photo imprimée sur feuille de sucre</p>
        <img src={photo} alt="Déco gâteau" />
      </div>);
  }
  if (cakeDeco.deco2 === '2D' || cakeDeco.deco2 === '3D') {
    decoration = (
      <div>
        Décoration
        {cakeDeco.deco2}
      </div>);
  }

  if (user === 'admin') {
    render.push(
      <tr>
        <td>N°</td>
        <td>{cake.id}</td>
      </tr>,
    );
  }

  render.push(
    <tr>
      <td>Occasion : </td>
      <td>{cake.occasion ? cake.occasion : 'Non précisée'}</td>
    </tr>,
    
    <tr>
      <td>Caractéristiques : </td>
      <td>{description}</td>
    </tr>,
    <tr>
      <td>Ingrédients : </td>
      <td><pre style={{ fontFamily: 'Arial', fontSize: '16px' }}>{ingredientsList}</pre></td>
    </tr>,
    <tr>
      <td>Décoration : </td>
      <td>{decoration}</td>
    </tr>,
    <tr>
      <td>Montant : </td>
      <td style={{ fontWeight: 'bold' }}>{cake.price.toFixed(2).replace(/[.,]00$/, '')} €</td>
    </tr>,
  );
  return render;
};

export default CakeDecoration;
