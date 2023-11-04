import React from 'react'
import Rating from './icons/Rating'
import '../css/components/summary.css'

interface SummaryProps {
    city:       string;
    floor:      number;
    moveInDate: Date;
    applyBy:    '12/12-2023';
    landlord:   string;
    rating:     number;
}
const Summary: React.FC<SummaryProps> = ({
    city,
    floor,
    moveInDate,
    applyBy,
    landlord,
    rating
}) => {

const formattedMoveInDate = moveInDate instanceof Date ? moveInDate.toLocaleDateString() : '';

return (
<>
<h2>Översikt</h2>
        <div className="summaryboxdivwrapper">
            <p>Område:</p><p>{city}</p>
        </div>
        <div className="summaryboxdivwrapper">
            <p>Våning:</p><p>{floor}</p>
        </div>
        <div className="summaryboxdivwrapper">
            <p>Inflytt:</p><p>{formattedMoveInDate}</p>
        </div>
        <div className="summaryboxdivwrapper">
            <p>Ansök senast:</p><p>{applyBy}</p>
        </div>
        <div className="summaryboxdivwrapper">
            <p>Hyresvärd:</p><p>{landlord}</p>
        </div>
        <div className="summaryboxdivwrapper">
            <p>Betyg</p><Rating showText={false} averageRating={rating} />
        </div>
</>
)
}

export default Summary