import React from 'react';
import '../css/components/TermsAndConditions.css'

const TermsAndConditions: React.FC = () => {
  return (
    <ol className="textwrap2info">
      <p>
        <strong>Viktiga krav och villkor från hyresföreningen:</strong>
      </p>
      <li>
        <strong>Deposition:</strong> En deposition om 5 000 kr måste betalas inom 7 dagar från acceptdatumet. Denna summa återbetalas när du flyttar ut, förutsatt att bostaden lämnas i ursprungligt skick.
      </li>
      <br />
      <li>
        <strong>Husdjur:</strong> Husdjur är tillåtna, men en särskild avgift om 200 kr/månad tillkommer.
      </li>
      <br />
      <li>
        <strong>Rökning:</strong> Rökning är strikt förbjuden inom bostadens område, inklusive balkonger och gemensamma utrymmen.
      </li>
      <br />
      <li>
        <strong>Inflyttningsdatum:</strong> Om inflyttningsdatum infaller på en helgdag så är inflyttningsdatumet första vardagen på kommande vecka. Var god se till att koordinera med fastighetsskötaren för att undvika kollisioner.
      </li>
      <br />
      <li>
        <strong>Uppsägningstid:</strong> Uppsägningstiden är tre månader från och med den första i nästa månad efter att uppsägning har gjorts.
      </li>
    </ol>
  );
};

export default TermsAndConditions;