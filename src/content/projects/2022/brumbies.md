---
slug: "brumbies-the-iconic-pest"
title: "Brumbies: The Iconic Pest "
date: "2024-04-01"
tags: ["Data Visualisation", "Design"]
layout: "A"
featured: true
summary: "A narrative, scroll-driven web article combining geospatial mapping and research synthesis to show where brumbies are, how many there are, and what that impact looks like on the ground."
coverAlt: "A scroll-driven article layout with a central map visualisation."
imagesDir: "/src/assets/portfolio/2022/brumbies"
---

## Overview
Brumbies have always felt like a strange entity—one I assumed came without much controversy. Once I started looking deeper, it became clear how complex the issue is: ecological damage, competing values, incomplete datasets, and a story that’s often told without showing the full impact. 

The goal of this project was to build a narrative-driven, scroll-based article with a map at the centre—showing **where brumbies are** and **how many there are**, while keeping the story accessible and grounded. 

## Research & Data Gathering
A major challenge was that the information was small and scattered—there wasn’t one clean dataset to pull from. Reports with strong information were often shortened for general audiences and didn’t include full study detail. 

To solve this, we scraped and consolidated data from multiple sources and formats to create a more coherent narrative about distribution and impact. We also sought subject-matter input to add specificity and credibility to the story, including concrete examples that could be shown to readers. 

## Design Direction
We took inspiration from strong “scrollytelling” patterns: a paced reading experience, simple language, and visuals that carry emotional weight. However, a key gap we wanted to address was **tangible data**—not just scenic imagery. The design intent was to preserve a compelling narrative while making the underlying impact legible through mapping and visual evidence. 

## Build & Interaction (HTML/CSS Scrollytelling)
The article is structured in discrete “steps,” where each step represents a change in topic. The core interaction is scroll-based pacing, supported by sticky media so images/maps stay present while text progresses. 

We originally considered a JavaScript framework for scroll control, but as scope and content evolved, a simple HTML/CSS approach stayed more adaptable. The structure was still designed with possible future JS enhancements in mind (smoother fades, transitions, and map state changes). 

## Map Visualisations
The map visuals were standardised into a consistent visual language so changes in geospatial information felt comparable from section to section. The trade-off of simplicity is that maps can sometimes lose reference context—something we’d address next with additional geographic cues and clearer scale/legend treatment. 

## Outcome
A complete narrative prototype that combines research synthesis, map-driven explanation, and scroll pacing to make a complex environmental issue easier to understand—while leaving room for future interaction upgrades. 

## Role
Research support, coding, map creation, layout system development.
