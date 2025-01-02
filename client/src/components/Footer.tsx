import { Link } from "react-router-dom";

const Footer = () => {
  var now = new Date();
  return (
    <footer className="section-p1 bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="col w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="content">
            <div className="desc">
              <img
                className="logo-footer mb-4 h-16"
                src="/logo.png"
                alt="logo"
              />
              <h4 className="text-xl font-semibold mb-2">Contacto</h4>
              <p className="text-base leading-6 mb-2">
                <strong>Morada: </strong>
                Rua Dr. Abel Varzim 9 Loja G, 4750-253 Barcelos
                <br />
                (Ao lado do centro de saúde São José)
              </p>
              <p className="text-base leading-6 mb-2">
                <strong>Telefone: </strong>910 522 448
              </p>
              <p className="text-base leading-6 mb-2">
                <strong>Horário: </strong>
              </p>
              <ul className="list-none space-y-1 text-base leading-6 ml-5">
                <li>
                  <strong
                    className={`${
                      now.getDay() !== 3 && now.getDay() !== 7
                        ? "text-secondary"
                        : ""
                    }`}
                  >
                    Segunda, Terça, Quinta, Sexta e Sábado:{" "}
                  </strong>
                  9h30-19h30
                </li>
                <li>
                  <strong
                    className={`${now.getDay() === 3 ? "text-secondary" : ""}`}
                  >
                    Quarta:{" "}
                  </strong>
                  14h30-19h30
                </li>
                <li>
                  <strong
                    className={`${now.getDay() === 7 ? "text-secondary" : ""}`}
                  >
                    Domingo:{" "}
                  </strong>
                  Fechado
                </li>
              </ul>
              <div className="follow mt-6">
                <h4 className="text-xl font-semibold mb-2">Redes Sociais</h4>
                <div className="icon flex space-x-4">
                  <Link
                    to="https://www.facebook.com/Barcelpet/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-6 h-6"
                      src="src/assets/socialMedia/facebook.png"
                      alt="facebook"
                    />
                  </Link>
                  <Link
                    to="https://www.instagram.com/barcelpet/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-6 h-6"
                      src="src/assets/socialMedia/instagram.png"
                      alt="instagram"
                    />
                  </Link>
                  <Link
                    to="https://www.tiktok.com/@barcelpet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-6 h-6"
                      src="src/assets/socialMedia/tiktok.png"
                      alt="tiktok"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col map w-full lg:w-1/2">
          <h4 className="text-xl font-semibold mb-4">Onde estamos</h4>
          <iframe
            className="w-full h-80 rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.623036159862!2d-8.62608862441428!3d41.5341054868824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2453374b648715%3A0x610e7951c4970cab!2sBarcelpet!5e0!3m2!1sen!2spt!4v1720798487083!5m2!1sen!2spt"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Barcelpet Location"
          ></iframe>
        </div>
      </div>
      <div className="copyright text-center mt-8 text-sm text-gray-600">
        <p>© 2024, Barcelpet</p>
      </div>
    </footer>
  );
};

export default Footer;
