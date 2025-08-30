# Developers' Society Workshop

Full-stack dating app for DevSoc IIT KGP workshop.

## Quick Start
### Run the commands given below in a bash terminal
&nbsp;&nbsp; [How to setup a Bash terminal in Windows](https://stackoverflow.com/questions/42606837/how-do-i-use-bash-on-windows-from-the-visual-studio-code-integrated-terminal)
### How to clone a github repository.
1. **Install Git**: [Click Here](https://github.com/git-guides/install-git)
2. **Clone a repository**: [Click Here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
3. Run the following code in the terminal
  ```bash
   git clone https://github.com/devsoc-iitkgp/devsoc-workshop
   cd devsoc-workshop
  ```
### Install Python (skip if already installed).
  [Click here to install python](InstallPython.md)
### Backend Setup
```bash
cd server/datingapp
pip install uv
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow
python manage.py migrate
python manage.py create_sample_data
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

## Usage

1. **Backend**: `http://localhost:8000`
2. **Frontend**: `http://localhost:3000`
3. **Login**: username `alice_johnson`, password `password123`

## What You Get

- ✅ Swipe interface (like Tinder)
- ✅ User authentication
- ✅ Match detection
- ✅ Mobile responsive
- ✅ Sample data included

## Handouts
[Workshop Handouts (Click Here)](https://drive.google.com/drive/folders/16cXk4QnNx0grnPFxJs355LAyatn3Ajhe?usp=sharing)

That's it! Start swiping! 💕
