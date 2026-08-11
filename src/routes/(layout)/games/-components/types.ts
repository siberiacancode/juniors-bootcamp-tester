import type { useGamePage } from '../-hooks';

export type GamePageContext = ReturnType<typeof useGamePage>;
export type GamePageState = GamePageContext['state'];
export type GamePageFunctions = GamePageContext['functions'];
export type GamePageForm = GamePageContext['form'];
export type GamePageFeatures = GamePageContext['features'];
