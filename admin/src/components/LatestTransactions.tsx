import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { axiosAuthAdminRequest } from "../api/requestMethods";
import { formatDate } from "../utils/helpers";

const LatestTransactions: FC = () => {
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const relativePath = "/orders";
                const method = "GET";
                const fetchedOrders = await axiosAuthAdminRequest(
                    relativePath,
                    method
                );
                setOrders(fetchedOrders);
            } catch {}
        };
        getOrders();
    }, []);

    return (
        <Container>
            <WidgetTitle>Latest Transactions</WidgetTitle>
            <WidgetTable>
                <TableRow>
                    <TableTh>Customer</TableTh>
                    <TableTh>Date</TableTh>
                    <TableTh>Amount</TableTh>
                    <TableTh>Status</TableTh>
                </TableRow>
                {orders.map((order) => (
                    <TableRow key={order._id}>
                        <UserCol>
                            <TableRowSpan>{order.userId}</TableRowSpan>
                        </UserCol>
                        <TableRowSpan>
                            {formatDate(order.createdAt)}
                        </TableRowSpan>
                        <TableRowSpan>${order.price}</TableRowSpan>
                        <WidgetStatusLabel type={order.status}>
                            {order.status}
                        </WidgetStatusLabel>
                    </TableRow>
                ))}
            </WidgetTable>
        </Container>
    );
};

export default LatestTransactions;

interface ITransactionLabelType {
    type: string;
}

const Container = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
`;

const WidgetTitle = styled.h3`
    font-size: 22px;
    font-weight: 600;
`;
const WidgetTable = styled.table`
    width: 100%;
    border-spacing: 20px;
`;
const TableTh = styled.th`
    text-align: left;
`;
const TableRow = styled.tr``;
const UserCol = styled.td`
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const TableRowSpan = styled.td`
    font-weight: 300;
`;

const WidgetStatusLabel = styled.label<ITransactionLabelType>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
    color: ${(props) => props.type === "pending" && "#1d82d4"};
    background-color: ${(props) => props.type === "pending" && "#2226e191"};
    color: ${(props) => props.type === "approved" && "#119240"};
    background-color: ${(props) => props.type === "approved" && "#14e0737c"};
    color: ${(props) => props.type === "declined" && "#d33838"};
    background-color: ${(props) => props.type === "declined" && "#ee13137e"};
`;
