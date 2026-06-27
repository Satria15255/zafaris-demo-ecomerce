import React from "react";
import {
	LineChart,
	Line,
	YAxis,
	XAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const SalesChart = ({ data }) => {
	return (
		<div className="bg-white rounded-xl p-5">
			<h2>Sales Overview</h2>
			<ResponsiveContainer width="100%" height={350}>
				<LineChart data={data}>
					<CartesianGrid strokeDashArray="3 3" />
					<XAxis dataKey="label" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="sales" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SalesChart;
