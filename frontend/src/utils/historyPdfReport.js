import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png";

const loadImage = (src) => {
    return new Promise((resolve, reject) => {

        const img = new Image();

        img.src = src;

        img.onload = () => resolve(img);

        img.onerror = reject;

    });
};
/* ============================================================
   COLORS
============================================================ */

const COLORS = {
    primary: [37, 99, 235],
    secondary: [30, 41, 59],
    success: [34, 197, 94],
    danger: [239, 68, 68],
    warning: [245, 158, 11],
    light: [241, 245, 249],
    border: [203, 213, 225],
    gray: [100, 116, 139],
    white: [255, 255, 255]
};

/* ============================================================
   HELPER
============================================================ */

const formatDate = (date) => {

    if (!date) return "N/A";

    return new Date(date).toLocaleString();

};

const drawDivider = (doc, y) => {

    doc.setDrawColor(...COLORS.border);

    doc.line(20, y, 190, y);

};

/* ============================================================
   COVER PAGE
============================================================ */

const addCoverPage = (doc, profile, logoImage) => {

    /* ==========================================
       HEADER BACKGROUND
    ========================================== */

    doc.setFillColor(...COLORS.primary);

    doc.rect(0, 0, 210, 55, "F");

    /* ==========================================
       LOGO
    ========================================== */

    if (logoImage) {

        doc.addImage(
            logoImage,
            "PNG",
            82,
            6,
            45,
            45
        );

    }

    /* ==========================================
       TITLE
    ========================================== */

    doc.setTextColor(255, 255, 255);

    doc.setFont("helvetica", "bold");

    doc.setFontSize(22);

    doc.text(
        "Deepfake Voice Authenticator",
        105,
        65,
        {
            align: "center"
        }
    );

    doc.setFont("helvetica", "normal");

    doc.setFontSize(14);

    doc.text(
        "AI Detection History Report",
        105,
        75,
        {
            align: "center"
        }
    );

    /* ==========================================
       AI BADGE
    ========================================== */

    doc.setFillColor(34, 197, 94);

    doc.roundedRect(
        68,
        82,
        74,
        10,
        3,
        3,
        "F"
    );

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(10);

    doc.text(
        "AI Powered Detection",
        105,
        89,
        {
            align: "center"
        }
    );

    /* ==========================================
       USER INFORMATION
    ========================================== */

    doc.setTextColor(...COLORS.secondary);

    doc.setFont("helvetica", "bold");

    doc.setFontSize(17);

    doc.text("Prepared For", 20, 110);

    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);

    doc.text(
        `Email : ${profile?.email || "Not Available"}`,
        20,
        123
    );

    doc.text(
        `Member Since : ${formatDate(profile?.member_since)}`,
        20,
        133
    );

    doc.text(
        `Generated : ${formatDate(new Date())}`,
        20,
        143
    );

    const reportId =
        "DVA-" +
        new Date()
            .toISOString()
            .replace(/[-:.TZ]/g, "")
            .slice(0, 14);

    doc.text(
        `Report ID : ${reportId}`,
        20,
        153
    );

    drawDivider(doc, 162);

    /* ==========================================
       EXECUTIVE SUMMARY
    ========================================== */

    doc.setFont("helvetica", "bold");

    doc.setFontSize(16);

    doc.text(
        "Executive Summary",
        20,
        176
    );

    doc.setFont("helvetica", "normal");

    doc.setFontSize(11);

    const summary =
        "This report summarizes all voice authenticity analyses performed using the Deepfake Voice Authenticator platform. It includes user information, prediction statistics, complete detection history and AI model details generated using the Wav2Vec2 + SVM pipeline.";

    doc.text(
        summary,
        20,
        188,
        {
            maxWidth: 170,
            lineHeightFactor: 1.6
        }
    );

    /* ==========================================
       MODEL CARD
    ========================================== */

    doc.setFillColor(...COLORS.light);

    doc.roundedRect(
        20,
        220,
        170,
        48,
        5,
        5,
        "F"
    );

    doc.setFont("helvetica", "bold");

    doc.setFontSize(14);

    doc.text(
        "AI Detection Model",
        30,
        234
    );

    doc.setFont("helvetica", "normal");

    doc.setFontSize(11);

    doc.text(
        "Model",
        30,
        247
    );

    doc.text(
        ":",
        72,
        247
    );

    doc.text(
        "Wav2Vec2 + SVM",
        78,
        247
    );

    doc.text(
        "Version",
        30,
        257
    );

    doc.text(
        ":",
        72,
        257
    );

    doc.text(
        "2.0",
        78,
        257
    );

    doc.text(
        "Accuracy",
        110,
        247
    );

    doc.text(
        ":",
        145,
        247
    );

    doc.text(
        "98.88%",
        150,
        247
    );


};

/* ============================================================
   EXECUTIVE SUMMARY PAGE
============================================================ */

const addSummaryPage = (doc, history, profile) => {

    doc.addPage();

    doc.setFontSize(22);

    doc.setTextColor(...COLORS.primary);

    doc.setFont(undefined, "bold");

    doc.text("Detection Statistics", 20, 25);

    drawDivider(doc, 32);

    const total = history.length;

    const real = history.filter(
        (x) => x.prediction === "REAL"
    ).length;

    const fake = history.filter(
        (x) => x.prediction === "FAKE"
    ).length;

    const average = (
        history.reduce(
            (sum, item) => sum + Number(item.probability || 0),
            0
        ) / total
    ).toFixed(2);

    const highest = Math.max(
        ...history.map((x) => Number(x.probability))
    ).toFixed(2);

    const lowest = Math.min(
        ...history.map((x) => Number(x.probability))
    ).toFixed(2);

    autoTable(doc, {

        startY: 45,

        theme: "grid",

        head: [["Summary", "Value"]],

        headStyles: {

            fillColor: COLORS.primary,

        },

        body: [

            ["Total Predictions", total],

            ["Authentic Voices", real],

            ["AI Generated Voices", fake],

            ["Average Confidence", `${average}%`],

            ["Highest Confidence", `${highest}%`],

            ["Lowest Confidence", `${lowest}%`],

        ],

    });

    autoTable(doc, {

        startY: doc.lastAutoTable.finalY + 15,

        head: [["User Information", "Details"]],

        headStyles: {

            fillColor: COLORS.secondary,

        },

        body: [

            ["Email", profile?.email],

            [
                "Member Since",
                formatDate(profile?.member_since),
            ],

            [
                "Total Reports",
                profile?.total_predictions,
            ],

            [
                "Authentic Voices",
                profile?.real_predictions,
            ],

            [
                "AI Generated Voices",
                profile?.fake_predictions,
            ],

        ],

    });

};
/* ============================================================
   HISTORY TABLE
============================================================ */

const addHistoryTable = (doc, history) => {

    doc.addPage();

    doc.setFontSize(22);
    doc.setTextColor(...COLORS.primary);
    doc.setFont(undefined, "bold");

    doc.text("Detection History", 20, 25);

    drawDivider(doc, 32);

    const rows = history.map((item, index) => [

        index + 1,

        item.filename,

        item.prediction,

        `${Number(item.probability || 0).toFixed(2)}%`,

        item.confidence,

        item.processing_time_ms
            ? `${item.processing_time_ms} ms`
            : "-",

        item.created_at
            ? new Date(item.created_at).toLocaleString()
            : "-"

    ]);

    autoTable(doc, {

        startY: 42,

        theme: "striped",

        head: [[

            "#",

            "Filename",

            "Prediction",

            "Confidence",

            "Level",

            "Time",

            "Date"

        ]],

        body: rows,

        headStyles: {

            fillColor: COLORS.primary,

            textColor: 255,

            fontStyle: "bold"

        },

        styles: {

            fontSize: 9,

            cellPadding: 3,

            overflow: "linebreak"

        },

        alternateRowStyles: {

            fillColor: [248,250,252]

        },

        didParseCell: function(data){

            if(data.section==="body" && data.column.index===2){

                if(data.cell.raw==="REAL"){

                    data.cell.styles.textColor=[34,197,94];

                    data.cell.styles.fontStyle="bold";

                }

                else{

                    data.cell.styles.textColor=[239,68,68];

                    data.cell.styles.fontStyle="bold";

                }

            }

        }

    });

};


/* ============================================================
   MODEL INFORMATION
============================================================ */

const addModelInformation = (doc) => {

    doc.addPage();

    doc.setFontSize(22);

    doc.setTextColor(...COLORS.primary);

    doc.setFont(undefined,"bold");

    doc.text("AI Model Information",20,25);

    drawDivider(doc,32);

    autoTable(doc,{

        startY:45,

        theme:"grid",

        head:[["Property","Value"]],

        headStyles:{

            fillColor:COLORS.primary

        },

        body:[

            ["Detection Model","Wav2Vec2 + SVM"],

            ["Model Version","2.0"],

            ["Framework","PyTorch"],

            ["Embedding Size","768"],

            ["Average Accuracy","98.88%"],

            ["Inference Device","CPU Optimized"],

            ["Audio Sample Rate","16 kHz"],

            ["Supported Formats","WAV, MP3, M4A"],

            ["Prediction Output","REAL / FAKE"],

            ["Developer","Deepfake Voice Authenticator"]

        ]

    });

    doc.setFontSize(11);

    doc.setTextColor(...COLORS.gray);

    doc.text(

        "The prediction engine uses Wav2Vec2 embeddings combined with an SVM classifier for detecting AI-generated speech.",

        20,

        doc.lastAutoTable.finalY + 15,

        {

            maxWidth:170

        }

    );

};


/* ============================================================
   FOOTER
============================================================ */

const addFooter = (doc) => {

    const pages = doc.getNumberOfPages();

    for (let i = 1; i <= pages; i++) {

        doc.setPage(i);

        doc.setDrawColor(220);

        doc.line(15, 280, 195, 280);

        doc.setFontSize(9);

        doc.setTextColor(120);

        // Left
        doc.text(
            "Deepfake Voice Authenticator",
            15,
            286
        );

        // Center
        doc.text(
            "AI Detection Platform | Version 2.0",
            105,
            286,
            {
                align: "center"
            }
        );

        // Right
        doc.text(
            `Page ${i} of ${pages}`,
            195,
            286,
            {
                align: "right"
            }
        );

    }

};

/* ============================================================
   MAIN FUNCTION
============================================================ */

export const generateHistoryPDF = async (history, profile) => {

    if(!history || history.length===0){

        alert("No history available.");

        return;

    }

    const doc=new jsPDF();
    const logoImage = await loadImage(logo);

    addCoverPage(doc,profile, logoImage);

    addSummaryPage(doc,history,profile);

    addHistoryTable(doc,history);

    addModelInformation(doc);

    addFooter(doc);

    const today=new Date()

        .toISOString()

        .split("T")[0];

    doc.save(

        `Detection_History_Report_${today}.pdf`

    );

};