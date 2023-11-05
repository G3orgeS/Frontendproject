import React from 'react'
import Rating from './icons/Rating'
import '../css/components/ApplySummary.css'

interface SummaryProps {
    city: string;
    floor: number;
    firstDate: string;
    landlord: string;
    rating: number;
}
const ApplySummary: React.FC<SummaryProps> = ({
    city,
    floor,
    firstDate,
    landlord,
    rating
}) => {

    return (
        <>
            <div className="applysummarybox">
                <div className="applysummaryboxdivwrapper">
                    <h2>Översikt</h2>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Område:</p><p>{city}</p>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Våning:</p><p>{floor}</p>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Inflytt:</p><p>{firstDate}</p>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Ansök senast:</p><p>2023-12/12</p>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Hyresvärd:</p><p>{landlord}</p>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Betyg</p><Rating showText={false} averageRating={rating} className="rating-star" />
                </div>
            </div>
        </>
    )
}

export default ApplySummary