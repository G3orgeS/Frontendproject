import '../../css/components/global/Footer.css'
import Icon from '../icons/Icon'

const Footer = () => {
    return (
        <>
            <div className="footerwrapper">
                <div>
                    <h2>Stöd</h2>
                    <p>Hjälpcenter</p>
                    <p>StudyStayCover</p>
                    <p>Antidiskriminering</p>
                    <p>Stöd för funktionsnedsättning</p>
                    <p>Avbokningsalternativ</p>
                    <p>Rapportera grannskapsproblem</p>
                </div>
                <div>
                    <h2>Värdskap</h2>
                    <p>Hyr ut ditt boende på StudyStay</p>
                    <p>StudyStayCover för värdar</p>
                    <p>Värderesurser</p>
                    <p>Community-form</p>
                </div>
                <div>
                    <h3>StudyStay</h3>
                    <p>Pressrum</p>
                    <p>Nya funktioner</p>
                    <p>Lediga tjänster</p>
                    <p>Investerare</p>
                    <p>Nödboende med StudyStay</p>
                </div>
            </div>
            <div className="footerwrapper2">
                <div className="footerbottom1">
                    <h4>© 2023 StudyStay AB.   ·   Integritet   ·   Villkor   ·   Sajtkarta   ·   Företagsuppgifter</h4>
                </div>
                <div className="footerbottom2">
                    <Icon showText={false} include="Facebook" />
                    <Icon showText={false} include="Instagram" />
                    <Icon showText={false} include="Linkedin" />
                </div>
            </div>
        </>
    )
}

export default Footer