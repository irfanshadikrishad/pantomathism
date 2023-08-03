import React from 'react';
import ContactSocialCard from "./ContactSocialCard";
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

export default function Contact() {
    return (
        <section className="container page contact">
            <div className="developer">
                <h1 className="primary intro">🐹</h1>
                <p className='developer__about'>🌹 Bonjour, I am Irfan Shadik Rishad and I am a Programmer. I am currently studying for BSc at Leading University, Sylhet. I work as a freelance web designer . In my spare time, I enjoy watching and reading anime and manga , as well as writing reviews about them. Wanna know my super power? I am invisible until someone needs me. Thanks for visiting my website. 💖</p>
                <p className='contact__dev'>Feel free to Contact Me:</p>
                <div className="social__cards">
                    <ContactSocialCard
                        link="https://irfanshadikrishad.github.io"
                        icon={<LanguageIcon />}
                        username="irfanshadikrishad.github.io"
                    />
                    <ContactSocialCard
                        link="https://github.com/irfanshadikrishad"
                        icon={<GitHubIcon />}
                        username="@irfanshadikrishad"
                    />
                    <ContactSocialCard
                        link="https://www.youtube.com/@irfanshadikrishad-yt"
                        icon={<YouTubeIcon />}
                        username="@irfanshadikrishad-yt"
                    />
                    <ContactSocialCard
                        link="https://www.instagram.com/irfanshadikrishad/"
                        icon={<InstagramIcon />}
                        username="@irfanshadikrishad"
                    />
                    <ContactSocialCard
                        link="https://www.linkedin.com/in/irfanshadikrishad/"
                        icon={<LinkedInIcon />}
                        username="@irfanshadikrishad"
                    />
                </div>

            </div>
        </section >
    )
}