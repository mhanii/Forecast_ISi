import React from 'react';
import './aboutus.css';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>Nosotros</h1>
      <div className='about-us-content'>
      <p>
        En <strong>ForeCastForge</strong>, estamos dedicados a proporcionarte la información meteorológica más precisa y actualizada para ayudarte a organizar tus planes de manera eficiente. Entendemos que el clima puede ser impredecible y, por eso, estamos aquí para ofrecerte herramientas que te permitan estar siempre un paso adelante, sin importar las condiciones meteorológicas.
      </p>
      <p>
        Nuestro servicio ofrece pronósticos tanto horarios como diarios, permitiéndote planificar tus actividades con antelación y tomar decisiones informadas. Ya sea que estés planeando un viaje, organizando un evento al aire libre o simplemente necesites saber si llevar un paraguas al trabajo, <strong>ForeCastForge</strong> tiene todo lo que necesitas para mantenerte informado y preparado.
      </p>
      <p>
        La cantidad de días de pronóstico que ofrecemos depende del tipo de suscripción que elijas. Nuestras suscripciones están diseñadas para adaptarse a tus necesidades específicas:
      </p>
      <ul>
        <li><strong>Usuarios gratuitos</strong>: Acceso a pronósticos diarios para los próximos 5 días.</li>
        <li><strong>Usuarios estándar</strong>: Acceso a pronósticos diarios extendidos para los próximos 11 días.</li>
        <li><strong>Usuarios premium</strong>: Acceso a una visión detallada de 45 días y pronósticos horarios.</li>
      </ul>
      <p>
        En <strong>ForeCastForge</strong>, nos enorgullece contar con un equipo de profesionales apasionados y dedicados que trabajan incansablemente para garantizar la precisión y fiabilidad de nuestros datos meteorológicos. Nuestro equipo está compuesto por:
      </p>
      <ul>
        <li><strong>Mohamed Hani</strong>: Cofundador y Jefe de Tecnología. Con una vasta experiencia en desarrollo de software y análisis de datos, Mohamed es el cerebro detrás de nuestra plataforma avanzada de pronósticos.</li>
        <li><strong>Zhan Pan</strong>: Cofundador y Director de Operaciones. Con una sólida trayectoria en la gestión de proyectos y estrategias de negocio, Zhan asegura que nuestros servicios se ejecuten sin problemas y satisfagan las expectativas de nuestros usuarios.</li>
      </ul>
      <p>
        Creemos en la importancia de mantenernos actualizados con las últimas tecnologías y metodologías de predicción meteorológica. Por ello, utilizamos una combinación de datos provenientes de APIs confiables y técnicas de scrapping para asegurarnos de que nuestros usuarios reciban información precisa y puntual.
      </p>
      <p>
        En <strong>ForeCastForge</strong>, estamos comprometidos a ayudarte a planificar con confianza y seguridad, ofreciéndote la tranquilidad de saber que tienes acceso a los mejores pronósticos meteorológicos disponibles. ¡Únete a nuestra comunidad y descubre cómo podemos ayudarte a convertirte en un experto en planificación meteorológica!
      </p>
      </div>
    </div>
  );
}