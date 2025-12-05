export default function Confidentialite() {
  return (
    <div>
        <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>

        <p className="mb-4">
            Chez SecureBlog, nous nous engageons à protéger la confidentialité de vos informations personnelles. Cette politique de confidentialité explique quelles données nous recueillons, comment nous les utilisons et quels sont vos droits à cet égard.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Collecte des informations</h2>
        <p className="mb-4">
            Nous collectons uniquement les données strictement nécessaires à la gestion de notre site, telles que :
        </p>
        <ul className="list-disc ml-6 mb-4">
            <li>Votre nom et adresse e-mail lors de l’inscription ou du contact</li>
            <li>Vos commentaires et retours sur notre contenu</li>
            <li>Des données de navigation anonymisées pour améliorer l’expérience utilisateur</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Utilisation des informations</h2>
        <p className="mb-4">
            Les informations collectées sont utilisées uniquement pour :
        </p>
        <ul className="list-disc ml-6 mb-4">
            <li>Vous proposer du contenu pertinent</li>
            <li>Gérer vos demandes et répondre à vos questions</li>
            <li>Améliorer notre site et nos services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Partage des données</h2>
        <p className="mb-4">
            Vos données personnelles ne sont jamais vendues ni partagées avec des tiers, sauf dans les cas prévus par la loi ou avec votre consentement explicite.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Sécurité</h2>
        <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité adaptées pour protéger vos données personnelles contre tout accès non autorisé, altération ou destruction.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Durée de conservation</h2>
        <p className="mb-4">
            Nous conservons vos données uniquement le temps nécessaire à la réalisation des finalités décrites ci-dessus et conformément à la législation en vigueur.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Vos droits</h2>
        <p className="mb-4">
            Vous pouvez à tout moment accéder à vos données, demander leur rectification ou leur suppression, ou exercer votre droit d’opposition. Pour toute demande, contactez-nous à l’adresse suivante : <a className="text-blue-600 underline" href="mailto:contact@secureblog.fr">contact@secureblog.fr</a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Modifications</h2>
        <p className="mb-4">
            Nous pouvons modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
        </p>

        <p className="mt-8 text-sm text-gray-500">
            Dernière mise à jour : Juin 2024
        </p>
        </div>
    </div>
  );
}
