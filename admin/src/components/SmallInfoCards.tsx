import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { axiosAuthAdminRequest } from "../api/requestMethods";

const SmallInfoCards: FC = () => {
    const [revenue, setRevenue] = useState<any>([]);
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const relativePath = "/orders/revenue";
                const method = "GET";
                const fetchedRevenue = await axiosAuthAdminRequest(
                    relativePath,
                    method
                );
                setRevenue(fetchedRevenue);
                // the following is to calculate the percentage of the revenue that
                // based on the revenue from this and previous month 
                setPercentage(
                    (revenue[1].total * 100) / revenue[0].total - 100
                );
            } catch (error) {
                console.log(error);
            }
        };
        getIncome();
    }, []);

    return (
        <Container>
            <Card>
                <CardTitle>Revenue</CardTitle>
                <CardMainBodyWrapper>
                    {revenue.length > 0 && (
                        <CardItem>${revenue[1].total}</CardItem>
                    )}
                    <CardItemRate>
                        %{Math.floor(percentage)}
                        {percentage < 0 ? (
                            <CardNegativeItemIcon>
                                <ArrowDownward className="featuredIcon negative" />
                            </CardNegativeItemIcon>
                        ) : (
                            <CardItemIcon>
                                <ArrowUpward className="featuredIcon" />
                            </CardItemIcon>
                        )}
                    </CardItemRate>
                </CardMainBodyWrapper>
                <CardFooter>Compared to last month</CardFooter>
            </Card>
            <Card>
                <CardTitle>Sales</CardTitle>
                <CardMainBodyWrapper>
                    <CardItem>$4,415</CardItem>
                    <CardItemRate>
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </CardItemRate>
                </CardMainBodyWrapper>
                <CardFooter>Compared to last month</CardFooter>
            </Card>
            <Card>
                <CardTitle>Cost</CardTitle>
                <CardMainBodyWrapper>
                    <CardItem>$2,225</CardItem>
                    <CardItemRate>
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </CardItemRate>
                </CardMainBodyWrapper>
                <CardFooter>Compared to last month</CardFooter>
            </Card>
        </Container>
    );
};

export default SmallInfoCards;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Card = styled.div`
    flex: 1;
    margin: 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.818);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const CardTitle = styled.span`
    font-size: 20px;
`;

const CardMainBodyWrapper = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`;

const CardItem = styled.span`
    font-size: 30px;
    font-weight: 600;
`;

const CardItemRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const CardItemIcon = styled.div`
    font-size: 14px;
    margin-left: 5px;
    color: green;
`;

const CardNegativeItemIcon = styled(CardItemIcon)`
    color: red;
`;

const CardFooter = styled.span`
    font-size: 15px;
    color: gray;
`;
