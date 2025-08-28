# script for sparqsync demo video

## highlighting features

### menu

- here we can edit profile information, such as your name, email, and address.
- under reports, you can select any project under your account, and get either daily details or a monthly report
    - currently these return the same data, but this will change

- we have some useful app settings, such as dark mode, or masking benign issues if they keep bothering you
- The support tab contains links to our website, where you can find our terms of service, FAQ, and our contact information.

- Lets take a look at our active plant next:

### My Plant

- The first thing you see once you get to this page is the plant status.  This area shows any faults, the connection type (grid-tied, off-grid), and any notifications.

- We then get into the statistics for the plant, showing the energy generated today, this week, and total lifetime generation.

- Underneath that, we have the weather for the address listed for the plant, supplied by AccuWeather.  This data can help explain plant performace, as we'll see in a minute.

- At the bottom of the dashboard, we have the impact section.  These values are calculated based on user-input local energy prices ($/kWh), and typical CO2 emissions per kWh. 

- After selecting your local currency, electricity price, and co2 emissions, you can see the impact section values update to reflect these changes.  

### Plant Info

- After clicking the information icon, we are taken to this page detailing various info about the plant itself.  You can see when it was installed, who installed it (along with their contact information), and some useful information about the SparqLinq and the inverters connected. 

- Here, (along with the System page which we'll view in a second) you can check in on the status of each inverter installed.  Any faults will be shown here, and you can trigger a GFDI reset from these sections.

### System

- This page again shows relevant SparqLinq data, along with all inverters connected in the installation.  If there is a GFDI issue, you'll be able to clear it from this page as well. (show sc of a few GFDI faults).

### Analysis

- The analysis page opens showing the power generated for the most recent day of data.  Tapping anywhere on the chart will show the 



## Rough Scripts

### gpt5

## Introduction

Hey everyone, welcome to the SparqSync demo! In this walkthrough, I’ll show you how the app helps you keep an eye on your solar system, check stats, and manage everything in one place.

---

## Main Menu

Let’s start on the home screen. Up here at the top, you can update your profile — things like your name, email, and address.

Right below that, you’ve got quick access to:

* **My Plants**, where all your installations are listed.
* **Reports**, which you can pull daily or monthly. (For now, they look the same, but that’ll be updated soon.)
* **App Settings**, where you can switch on dark mode or hide those harmless little notifications if they get annoying.
* And finally, the **Support tab** with links to FAQs, terms of service, and how to contact us if you need help.

Alright, let’s jump into a plant and see what that looks like.

---

## My Plant

Here’s the main dashboard for a plant. Right away, you see its **status** — so you’ll know if everything’s running smoothly, or if there’s a fault you need to check on. You’ll also see the **connection type**, whether it’s on-grid or off-grid, plus any active **notifications**.

Scrolling down, you get to the **performance stats**: today’s generation, the past week, and the lifetime total. Super easy to track how your system is doing.

Next is the **weather feed**. That comes from AccuWeather, and it’s matched to your plant’s location. It’s great for putting performance in context — like if it’s cloudy, you’ll see right away why output might be a little lower.

And finally, at the bottom is the **impact section**. This shows cost savings and CO₂ reduction based on your local prices and emissions factors. You can plug in your own numbers and watch those values update right away.

---

## Plant Info

If you tap the info icon, you land on the details page. This is where you see when the plant was installed, who did the installation, and their contact info. You’ll also find details about the SparqLinq and connected inverters.

From here, you can check the health of each inverter, see any faults, and even trigger a GFDI reset when needed.

---

## System Page

The **System tab** gives you a big-picture look at all the inverters. If there’s a GFDI issue, this is where you can clear it. It’s a handy place to keep track of everything connected to your installation.

---

## Analysis

Now let’s take a look at **Analysis**. By default, it shows you the most recent day of power generation. If you tap anywhere on the chart, you’ll get details at the inverter level.

You can also check daily energy distribution, so you’ll see exactly how much power was produced hour by hour.

---

## Notifications

And finally, there’s **Notifications**. This is where you’ll see alerts like undervoltage protection, an inverter going offline, or a channel getting disabled. Most of these are just informational, so you’ll know the difference between something you need to act on versus something harmless.

---

## Closing

And that’s it! With SparqSync, you get a clear view of your solar system, real-time inverter updates, and smart notifications to keep you informed. Thanks for following along, and we hope you enjoy using SparqSync to get the most out of your solar setup.
