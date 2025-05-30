import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../Animations';
import { ProjectCard } from '../ProjectCard';
import {
  Cloud,
  Database,
  ExternalLink,
  Github,
  Package,
  User,
} from 'lucide-react';

const Project = () => {
  return (
    <>
      <div className="absolute inset-0 bg-background/95"></div>
      <div className="container relative z-10 px-4">
        <FadeIn>
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text">
              👨‍💻 Featured Creations
            </h2>
            <p className="max-w-[700px] text-sm sm:text-base md:text-xl text-muted-foreground px-4">
              Check out some of my recent work and open-source contributions
            </p>
          </div>
        </FadeIn>
        <StaggerContainer
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          delay={0.2}
        >
          <StaggerItem>
            <ProjectCard
              title="Portfolio"
              description="A modern, responsive portfolio website built with Next.js, featuring glassmorphic design, smooth animations, and interactive elements showcasing my skills and projects."
              link="https://github.com/iamanonymous419/portfolio"
              tags={['Next.js', 'Framer Motion', 'Glassmorphism', 'TypeScript']}
              icon={<User className="h-4 w-4" />}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard
              title="Marketverse"
              description="A feature-rich e-commerce platform built with Next.js that enables users to buy and sell products. Implements modern UI with ShadCN, secure authentication with Clerk, and responsive design."
              link="https://marketverse-phi.vercel.app"
              tags={['Next.js', 'E-commerce', 'ShadCN UI', 'Authentication']}
              icon={<ExternalLink className="h-4 w-4" />}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard
              title="Marketverse GitOps"
              description="DevOps infrastructure for the Marketverse project featuring ArgoCD and Jenkins for continuous integration and continuous deployment, complete with Infrastructure as Code using Terraform and Configuration Management using Ansible."
              link="https://github.com/iamanonymous419/marketverse-gitops"
              tags={['ArgoCD', 'Jenkins', 'Terraform', 'Ansible', 'Trivy']}
              icon={<Github className="h-4 w-4" />}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard
              title="Terraform Custom EC2 Module"
              description="Published Terraform module for launching AWS EC2 Spot and On-Demand Instances. Helps explore module creation and usage."
              link="https://registry.terraform.io/modules/iamanonymous419/ec2-module/aws/latest"
              tags={['Terraform', 'AWS', 'EC2', 'Module']}
              icon={<Cloud className="h-4 w-4" />}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard
              title="Anoverse (npm package)"
              description="Custom NPM package published and integrated with the Marketverse project, showcasing package development and distribution expertise."
              link="https://www.npmjs.com/package/anoverse"
              tags={['NPM', 'Package', 'JavaScript', 'Development']}
              icon={<Package className="h-4 w-4" />}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard
              title="Marketverse Banking API"
              description="Backend banking API developed with NestJS and MongoDB, simulating basic financial transactions for Marketverse EcoSystem."
              link="https://github.com/iamanonymous419/marketverse-banking"
              tags={['NestJS', 'MongoDB', 'API', 'Banking']}
              icon={<Database className="h-4 w-4" />}
            />
          </StaggerItem>
        </StaggerContainer>
        <div className="text-right mt-6 sm:mt-8 px-4">
          <p className="text-sm sm:text-base text-muted-foreground italic">
            ...developing more projects that push boundaries 😉
          </p>
        </div>
      </div>
    </>
  );
};

export default Project;
