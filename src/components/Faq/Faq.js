import React from 'react';

import './Faq.scss';

const Faq = () => (
  <div className="faq">
    <h1 className="faq__title">FAQ</h1>
    <article className="faq__article">
      <h2 className="faq__article__title">A quoi ça sert ?</h2>
      <p className="faq__article__body">Cette application permet de trouver une liste de dépôts GitHub pour un critère donné.</p>
    </article>
    <article className="faq__article">
      <h2 className="faq__article__title">Comment faire une recherche ?</h2>
      <p className="faq__article__body">Sur la page recherche, complétez le champ de recherche et valider la recherche.</p>
    </article>
    <article className="faq__article">
      <h2 className="faq__article__title">Puis-je chercher n'importe quel terme ?</h2>
      <p className="faq__article__body">Oui, c'est fou.</p>
    </article>
    <article className="faq__article">
      <h2 className="faq__article__title">A quoi sert l'étoile en bas de la carte d'un dépot ?</h2>
      <p className="faq__article__body">Elle permet de mettre le dépot dans tes favoris. Tu peux ensuite les consulter dans le menu "favoris".</p>
    </article>
  </div>
);

export default Faq;
