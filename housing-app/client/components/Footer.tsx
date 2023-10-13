import '../css/components/Footer.css'
import FontAw from '../components/icons/FontAw'

const Footer = () => {
    return (
        <>
            <div className="footerwrapper">
                <div>
                    <h1>Stöd</h1>
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
                    <FontAw iconName="facebook" />
                    <FontAw iconName="instagram" />
                    <FontAw iconName="linkedin" />
                </div>
            </div>
        </>
    )
}

export default Footer