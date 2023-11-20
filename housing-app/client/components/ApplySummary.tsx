import React from 'react';
import Rating from './icons/Rating';
import '../css/components/ApplySummary.css';

interface SummaryProps {
    city: string;
    floor: number;
    firstDate: string;
    landlord: string;
    rating: number;
    cost: number;
}

const ApplySummary: React.FC<SummaryProps> = ({
    city,
    floor,
    firstDate,
    landlord,
    rating,
    cost,
}) => {
    return (
        <>
            <div className="applysummarybox">
                <div className="applysummaryboxdivwrapper">
                    <h2>Översikt</h2>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Hyra:</p>
                    <div className="applysummaryboxcontent">
                        <p>{cost}kr/mån</p>
                    </div>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Område:</p>
                    <div className="applysummaryboxcontent">
                        <p>{city}</p>
                    </div>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Våning:</p>
                    <div className="applysummaryboxcontent">
                        <p>{floor}</p>
                    </div>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Inflytt:</p>
                    <div className="applysummaryboxcontent">
                        <p>{firstDate}</p>
                    </div>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Ansök senast:</p>
                    <div className="applysummaryboxcontent">
                        <p>2023-12/12</p>
                    </div>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Hyresvärd:</p>
                    <div className="applysummaryboxcontent">
                        <p>{landlord}</p>
                    </div>
                </div>
                <div className="applysummaryboxdivwrapper">
                    <p>Betyg</p>
                    <div className="applysummaryboxcontent">
                        <Rating showText={false} averageRating={rating} className="rating-star" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplySummary;