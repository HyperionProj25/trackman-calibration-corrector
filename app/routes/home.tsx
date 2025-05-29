import type { Route } from "./+types/home";
import { TrackManCalibrationCorrector } from "../components/TrackManCalibrationCorrector";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TrackMan CSV Calibration Corrector" },
    { name: "description", content: "Correct TrackMan baseball radar data when physical setup differs from calibrated parameters" },
  ];
}

export default function Home() {
  return <TrackManCalibrationCorrector />;
}
