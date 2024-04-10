import "./style.css";
import { gameboardInit } from "./gameboard.ts";

gameboardInit(document.querySelector<HTMLDivElement>("#gameBoard")!);
