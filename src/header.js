//    LibreNS++ | Secure NationStates++ Alternative
//    Copyright (C) 2014-2015  RunasSudo (Yingtong Li)
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ==UserScript==
// @name        LibreNS++
// @namespace   https://github.com/RunasSudo/LibreNSpp
// @version     m4_include(../version)
// @description Free as in 'free speech', 'free beer' and 'free from tyranny'.
// @match       http://*.nationstates.net/*
// @match       https://*.nationstates.net/*
// @copyright   2014-2015, RunasSudo (Yingtong Li)
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue

// ==/UserScript==

var version = "m4_include(../version)";

m4_define(`asset', `m4_esyscmd(base64 -w 0 "assets/$1")')
