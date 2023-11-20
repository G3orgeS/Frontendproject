import React from 'react'
import Rating from './icons/Rating'
import '../css/components/summary.css'

interface SummaryProps {
    city: string;
    floor: number;
    firstDate: string;
    landlord: string;
    rating: number;
}
const Summary: React.FC<SummaryProps> = ({
    city,
    floor,
    firstDate,
    landlord,
    rating
}) => {

    return (
        <>
            <div className="summarybox">
                <div className="summaryboxdivwrapper">
                    <h2>Översikt</h2>
                </div>
                <div className="summaryboxdivwrapper">
                    <p>Område:</p><p>{city}</p>
                </div>
                <div className="summaryboxdivwrapper">
                    <p>Våning:</p><p>{floor}</p>
                </div>
                <div className="summaryboxdivwrapper">
                    <p>Inflytt:</p><p>{firstDate}</p>
                </div>
                <div className="summaryboxdivwrapper">
                    <p>Ansök senast:</p><p>2023-12/12</p>
                </div>
                <div className="summaryboxdivwrapper">
                    <p>Hyresvärd:</p><p>{landlord}</p>
                </div>
                <div className="summaryboxdivwrapper">
                    <p>Betyg</p><p><Rating showText={false} averageRating={rating} className="rating-star" /></p>
                </div>
                <div className="summaryboxdivwrapperlast">
                    <p>Ansökan är öppen och görs via vår bostadskö.</p>
                </div>
            </div>
        </>
    )
}

export default Summary