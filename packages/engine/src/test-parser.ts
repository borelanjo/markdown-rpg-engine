import { parseAdventure } from "./parser";
import * as fs from "fs";
import * as path from "path";

const adventurePath = path.resolve(__dirname, "../../../adventures/a-caverna-do-dragao/aventura.md");
const content = fs.readFileSync(adventurePath, "utf-8");

try {
  const adventure = parseAdventure(content);
  console.log("Adventure Parsed Successfully!");
  console.log("Title:", adventure.metadata.title);
  console.log("Pages found:", Object.keys(adventure.pages).length);
  console.log("Start Page Choices:", adventure.pages["start"].choices);
} catch (error) {
  console.error("Parsing failed:", error);
}
