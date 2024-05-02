// import React from "react";
// import fs from "fs";
import axios from "axios";

const Location = () => {};

export const getServerSideProps = async ({ res }) => {
    const baseUrl = {
        development: "http://localhost:3008",
        production: "https://hamnavaz.com",
    }[process.env.NODE_ENV];




    const sitemap = `<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
	<Document>
		<name>Locations for آژانس هواپیمایی بلیطجا</name>
		<open>1</open>
		<Folder>
			<atom:link href="https://hamnavaz.com" />
			<Placemark>
				<name><![CDATA[آژانس هواپیمایی بلیطجا]]></name>
				<description><![CDATA[بلیطجا ]]></description>
				<address><![CDATA[سهروردی جنوبی، خیابان ابرار شرقی، خیابان اقلیمی، پلاک 12، واحد سوم]]></address>
				<phoneNumber><![CDATA[+982184278]]></phoneNumber>
				<atom:link href="https://hamnavaz.com"/>
				<LookAt>
					<latitude>35.718881</latitude>
					<longitude>51.435420</longitude>
					<altitude>0</altitude>
					<range></range>
					<tilt>0</tilt>
				</LookAt>
				<Point>
					<coordinates>35.718881,51.435420</coordinates>
				</Point>
			</Placemark>
		</Folder>
	</Document>
</kml>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Location;
