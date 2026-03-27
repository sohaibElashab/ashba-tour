const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Configuration
const MEDIA_DIR = path.join(__dirname, "../public/media");
const DATA_DIR = path.join(__dirname, "../data");
const FLEET_EXCEL = path.join(
  MEDIA_DIR,
  "Tableau de Gestion de Flotte Touristique.xlsx",
);
const TOURS_EXCEL = path.join(MEDIA_DIR, "transport ashab tours.xlsx");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Helper: Get all files in media dir
const mediaFiles = fs.readdirSync(MEDIA_DIR);

function parseFleet() {
  console.log("🚗 Parsing Fleet...");
  if (!fs.existsSync(FLEET_EXCEL)) {
    console.error(`❌ Fleet Excel not found at ${FLEET_EXCEL}`);
    return;
  }

  const workbook = XLSX.readFile(FLEET_EXCEL);
  const sheetName = workbook.SheetNames[0]; // Assuming first sheet
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(sheet);

  const fleet = rawData.map((row) => {
    // Map columns based on user description (A=ID/Name, B=Marque, etc.)
    // Note: sheet_to_json uses header row keys. We need to be flexible or check the keys.
    // Let's assume standard keys from the file or map them if they are obscure.
    // Based on user prompt: A → ID / Nom, B → Marque & Modèle, C → Places, D → État, E → prix, F → luggage
    // We might need to inspect the raw keys, but for now let's try to map by checking properties.
    // If keys are localized, we might need to adjust.

    // Strategy: Use Object.values/keys to map by index if headers are unstable,
    // OR rely on the standard `sheet_to_json` result if headers are clean.
    // Let's print one row to debug if needed, but for now we'll assume the keys match the description roughly.
    // However, user gave specific columns. `sheet_to_json` output depends on the first row (headers).

    // Let's look for keys that look like "ID", "Nom", "Marque", "Places", "Etat", "Prix", "Luggage"
    const keys = Object.keys(row);

    // Heuristic mapping
    const idRaw = row["ID / Nom"] || row["ID"] || row["Nom"] || row[keys[0]]; // Column A
    const id = idRaw
      ? String(idRaw).trim()
      : `V${Math.floor(Math.random() * 1000)}`;

    const model =
      row["Marque & Modèle"] ||
      row["Marque"] ||
      row["Model"] ||
      row[keys[1]] ||
      "Unknown Model";
    const places = row["Places"] || row["Capacity"] || row[keys[2]] || 0;
    const status =
      row["État (Statut)"] ||
      row["Etat"] ||
      row["Status"] ||
      row[keys[3]] ||
      "Disponible";
    const price =
      row["prix"] || row["Prix"] || row["Price"] || row[keys[4]] || "Sur devis";
    const luggage =
      row["luggage"] || row["Luggage"] || row["Bagages"] || row[keys[5]] || "";

    // Image Matching Logic: specific ID starting match
    // Image Matching Logic: Match by numeric ID to handle V01 vs V001
    const idNum = parseInt(id.replace(/\D/g, "")) || 0;

    const images = mediaFiles
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return false;

        const filename = path.basename(file, ext);
        // Check if file starts with V (ignoring case)
        if (!filename.toLowerCase().startsWith("v")) return false;

        // Check specific numeric match
        const fileNum = parseInt(filename.replace(/\D/g, "")) || 0;
        return fileNum === idNum;
      })
      .map((file) => `/media/${file}`);

    // Log warning if no images found
    if (images.length === 0) {
      console.warn(`⚠️ No images found for vehicle ${id} (${model})`);
    }

    return {
      id,
      model,
      places,
      status,
      price,
      luggage,
      images,
      slug: model
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    };
  });

  fs.writeFileSync(
    path.join(DATA_DIR, "fleet.json"),
    JSON.stringify(fleet, null, 2),
  );
  console.log(`✅ Generated fleet.json with ${fleet.length} vehicles.`);
  return fleet;
}

function parseTours() {
  console.log("🏜 Parsing Tours...");
  if (!fs.existsSync(TOURS_EXCEL)) {
    console.error(`❌ Tours Excel not found at ${TOURS_EXCEL}`);
    return;
  }

  const workbook = XLSX.readFile(TOURS_EXCEL);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(sheet);

  const tours = rawData.map((row, index) => {
    // A -> id
    // B -> title
    // C -> description
    // D -> vehicleType
    // E -> capacity
    // F -> image (filename)
    // G -> features
    // H -> category
    // I -> featured

    const keys = Object.keys(row);

    const id = row["id"] || row["ID"] || row[keys[0]] || `Tour-${index}`;
    const title =
      row["title"] || row["Title"] || row[keys[1]] || "Untitled Tour";
    const description =
      row["description"] || row["Description"] || row[keys[2]] || "";
    const vehicleType =
      row["vehicleType"] || row["VehicleType"] || row[keys[3]] || "";
    const capacity = row["capacity"] || row["Capacity"] || row[keys[4]] || "";
    const imageFilename = row["image"] || row["Image"] || row[keys[5]];
    const features = row["features"] || row["Features"] || row[keys[6]] || "";
    const category =
      row["category"] || row["Category"] || row[keys[7]] || "General";
    const featuredRaw = row["featured"] || row["Featured"] || row[keys[8]];
    const featured =
      String(featuredRaw).toLowerCase() === "true" || featuredRaw === true;

    // French translations (optional fields)
    const titleFr = row["titleFr"] || row["TitleFr"] || row["title_fr"] || "";
    const descriptionFr =
      row["descriptionFr"] ||
      row["DescriptionFr"] ||
      row["description_fr"] ||
      "";
    const featuresFr =
      row["featuresFr"] || row["FeaturesFr"] || row["features_fr"] || "";

    // Image Logic: Exact filename match in /public/media
    let imagePath = "/placeholder.svg";
    if (imageFilename) {
      const foundImage = mediaFiles.find(
        (file) =>
          file.toLowerCase() === String(imageFilename).trim().toLowerCase(),
      );
      if (foundImage) {
        imagePath = `/media/${foundImage}`;
      } else {
        console.warn(
          `⚠️ Tour image not found: ${imageFilename} for tour ${id}`,
        );
      }
    }

    const tour = {
      id,
      title,
      description,
      vehicleType,
      capacity,
      image: imagePath,
      features,
      category,
      featured,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    };

    // Only include French fields if they have values
    if (titleFr) tour.titleFr = titleFr;
    if (descriptionFr) tour.descriptionFr = descriptionFr;
    if (featuresFr) tour.featuresFr = featuresFr;

    return tour;
  });

  fs.writeFileSync(
    path.join(DATA_DIR, "tours.json"),
    JSON.stringify(tours, null, 2),
  );
  console.log(`✅ Generated tours.json with ${tours.length} tours.`);
  return tours;
}

try {
  parseFleet();
  parseTours();
  console.log("🎉 Data generation complete!");
} catch (error) {
  console.error("❌ Error generating data:", error);
}
