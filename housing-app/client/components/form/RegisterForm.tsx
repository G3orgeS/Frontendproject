import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/components/form/RegisterForm.css';
import { registerUser } from '../../data/userApi';
import Button from '../global/Button';

const studystayimg = '../resource/studystay-logo2.jpg';

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    termsCheckbox: false,
  });

  const handleSubmit = async () => {
    setError(null);

    if (!formValues.termsCheckbox) {
      setError('Du måste godkänna villkoren');
      return;
    }

    if (
      !formValues.firstName ||
      !formValues.lastName ||
      !formValues.email ||
      !formValues.userName ||
      !formValues.password
    ) {
      setError('Alla fält måste fyllas i');
      return;
    }

    const registered = await registerUser(
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.userName,
      formValues.password
    );

    if (registered) {
      setSuccessMessage('Användare är registrerad');

      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        termsCheckbox: false,
      });
    } else {
      setError('Användarnamnet eller mejlen är redan upptagen.');
    }
  };

  return (
    <div className="regformwrapper">
      <div className="infosection1 rightwrap">
        <h1>Bostadskö för våra hyresrätter</h1>
        <span>
          Välkommen till StudyStays bostadskö för lediga studentbostäder. Vår kö är kostnadsfri och du kan ställa dig i kön när du har fyllt 16 år och söka en bostad när du fyllt 18 år.
        </span>
        <br />
        <h2>Registrera dig kostnadsfritt</h2>
      </div>
      <img src={studystayimg} alt="studystay logo" />
      <div className="reg-inputsection">
        <div className="reg-input">
          <input
            type="text"
            id="firstName"
            placeholder="FÖRNAMN"
            value={formValues.firstName}
            onChange={(e) =>
              setFormValues({ ...formValues, firstName: e.target.value })
            }
          />
          <input
            type="text"
            id="lastName"
            placeholder="EFTERNAMN"
            value={formValues.lastName}
            onChange={(e) =>
              setFormValues({ ...formValues, lastName: e.target.value })
            }
          />
          <input
            type="email"
            id="email"
            placeholder="E-MAIL"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>
        <div className="reg-input">
          <input
            type="text"
            id="userName"
            placeholder="ANVÄNDARNAMN"
            value={formValues.userName}
            onChange={(e) =>
              setFormValues({ ...formValues, userName: e.target.value })
            }
          />
          <input
            type="password"
            id="password"
            placeholder="LÖSENORD"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="VERIFIERA LÖSENORD"
            value={formValues.confirmPassword}
            onChange={(e) =>
              setFormValues({ ...formValues, confirmPassword: e.target.value })
            }
          />
          <div className="checkboxen">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={formValues.termsCheckbox}
              onChange={() =>
                setFormValues({
                  ...formValues,
                  termsCheckbox: !formValues.termsCheckbox,
                })
              }
            />
            <label htmlFor="termsCheckbox">Jag godkänner villkoren</label>
          </div>
        </div>
      </div>
      {error && <p className="error-message">*{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>} 
      <Button onClick={handleSubmit} >registera</Button>
      <div className="loginLink rightwrap">
        <h2>Står du redan i vår kö?</h2>
        <p>
          <Link to="/login">Klicka här</Link> för att logga in på ditt konto
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;