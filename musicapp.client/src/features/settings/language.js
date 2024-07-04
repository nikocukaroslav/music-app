import {store} from "@/store.js";

const state = store.getState();
const language = state.settings.language;


export const $LoadMusic =
    language === "uk"
        ?
        "Завантажити музику"
        :
        "Load music"

export const $NewAlbum =
    language === "uk"
        ?
        "Новий альбом"
        :
        "New Album"

export const $AddMusic =
    language === "uk"
        ?
        "Додати музику"
        :
        "Add music"

export const $Select =
    language === "uk"
        ?
        "Обрати"
        :
        "Select"

export const $Delete =
    language === "uk"
        ?
        "Видалити"
        :
        "Delete"

export const $Share =
    language === "uk"
        ?
        "Поділитися"
        :
        "Share"

export const $Remove =
    language === "uk"
        ?
        "Прибрати"
        :
        "Remove"

export const $Music =
    language === "uk"
        ?
        "Музика"
        :
        "Music"

export const $Albums =
    language === "uk"
        ?
        "Альбоми"
        :
        "Albums"

export const $Settings =
    language === "uk"
        ?
        "Налаштування"
        :
        "Settings"

export const $ConfirmDeleting =
    language === "uk"
        ?
        "Ви впевнені?"
        :
        "Are you sure?"

export const $Cancel =
    language === "uk"
        ?
        "Відмінити"
        :
        "Cancel"

export const $Add =
    language === "uk"
        ?
        "Додати"
        :
        "Add"


export const $AlbumName =
    language === "uk"
        ?
        "Ім'я альбому"
        :
        "Album name"

export const $AddMusicFirst =
    language === "uk"
        ?
        "Спочатку додайте музику"
        :
        "Add music first"

export const $ChooseAlbum =
    language === "uk"
        ?
        "Виберіть альбом для програвання"
        :
        "Choose album to play"

export const $AllMusicAlreadyInAlbum =
    language === "uk"
        ?
        "Вся музика вже в альбомі"
        :
        "All music already in album"

export const $ShowJumpControls =
    language === "uk"
        ?
        "Показувати перемотувачі"
        :
        "Show jump controls"

export const $Language =
    language === "uk"
        ?
        "Мова"
        :
        "Language"

export const $Theme =
    language === "uk"
        ?
        "Тема"
        :
        "Theme"

