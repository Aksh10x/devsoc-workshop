# A Beginner's Guide to Installing Python and `uv` on Windows

This guide will walk you through installing Python on your Windows computer and then using its package manager, `pip`, to install a fast alternative called `uv`. Let's get started!

### Part 1: Installing Python

Python is the programming language we need. We'll install it from its official website.

1.  **Download the Python Installer:**
    * Open your web browser and go to the official Python website's download page for Windows: <https://www.python.org/downloads/windows/>
    * Click on the latest stable release link. It will likely be named "Latest Python 3 Release - Python 3.x.x".
    * Scroll down to the "Files" section and click on the **"Windows installer (64-bit)"** to download it.

2.  **Run the Python Installer:**
    * Once the download is complete, find the file (usually in your `Downloads` folder) and double-click it to run the installer.

3.  **IMPORTANT Installation Step:**
    * When the installer window opens, you will see two checkboxes at the bottom.
    * **YOU MUST CHECK THE BOX that says "Add Python.exe to PATH".** This is very important as it lets you run Python from any folder on your computer.
    * After checking that box, click on **"Install Now"**. The installation will proceed.

4.  **Verify the Installation:**
    * Once the installation is finished, let's make sure it worked.
    * Press the **Windows Key** on your keyboard, type `cmd`, and press **Enter**. This will open the Command Prompt.
    * In the black window that appears, type the following command and press **Enter**:
        ```
        python --version
        ```
    * If you see something like `Python 3.12.4`, it means Python was installed correctly!

### Part 2: Installing `uv`

Now that you have Python, you also have a tool called `pip`. Think of `pip` as an app store for Python programs. We will use `pip` to install `uv`, which is a very fast tool for managing Python packages.

1.  **Open Command Prompt:**
    * If you closed it, open the Command Prompt again (Press **Windows Key**, type `cmd`, press **Enter**).

2.  **Install `uv`:**
    * In the Command Prompt window, type the following command exactly as it is written and press **Enter**:
        ```
        pip install uv
        ```
    * You will see some text as it downloads and installs `uv`. This should be very quick.

3.  **Verify the `uv` Installation:**
    * To make sure `uv` is ready to go, type this command and press **Enter**:
        ```
        uv --version
        ```
    * If you see something like `uv 0.1.0`, it means `uv` has been successfully installed.

**Congratulations!** You have now installed both Python and `uv` on your Windows computer. You're ready to start working with Python projects.
