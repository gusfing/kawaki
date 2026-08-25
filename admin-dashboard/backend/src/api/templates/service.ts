import { randomUUID } from 'crypto';

export interface ContentTemplate {
  id: string;
  name: string;
  type: 'blog' | 'page';
  content: string;
  tags?: string[];
  description?: string;
  createdAt: Date;
}

export class TemplateService {
  private templates: Map<string, ContentTemplate> = new Map();

  async createTemplate(input: {
    name: string;
    type: 'blog' | 'page';
    content: string;
    tags?: string[];
    description?: string;
  }): Promise<ContentTemplate> {
    const template: ContentTemplate = {
      id: randomUUID(),
      ...input,
      createdAt: new Date(),
    };

    this.templates.set(template.id, template);
    return template;
  }

  async getTemplate(id: string): Promise<ContentTemplate | null> {
    return this.templates.get(id) || null;
  }

  async listTemplates(type?: 'blog' | 'page'): Promise<ContentTemplate[]> {
    const templates = Array.from(this.templates.values());
    if (type) {
      return templates.filter((t) => t.type === type);
    }
    return templates;
  }

  async updateTemplate(
    id: string,
    input: Partial<Omit<ContentTemplate, 'id' | 'createdAt'>>
  ): Promise<ContentTemplate> {
    const template = this.templates.get(id);
    if (!template) throw new Error('Template not found');

    const updated = { ...template, ...input };
    this.templates.set(id, updated);
    return updated;
  }

  async deleteTemplate(id: string): Promise<void> {
    this.templates.delete(id);
  }

  async cloneTemplate(id: string, newName: string): Promise<ContentTemplate> {
    const template = this.templates.get(id);
    if (!template) throw new Error('Template not found');

    return this.createTemplate({
      name: newName,
      type: template.type,
      content: template.content,
      tags: template.tags,
      description: template.description,
    });
  }

  // Built-in templates
  getBuiltInTemplates(): ContentTemplate[] {
    return [
      {
        id: 'blog-intro-template',
        name: 'Blog Post - Introduction Style',
        type: 'blog',
        description: 'Great for opening with a hook and overview',
        content: `# [Your Title Here]

## Introduction
Start with a compelling hook that captures attention. Introduce the topic and explain why it matters to your readers.

## The Problem
Describe the challenge or question your content addresses.

## The Solution
Walk through your solution step by step.

## Key Takeaways
- Point 1
- Point 2
- Point 3

## Conclusion
Wrap up your thoughts and include a call-to-action.`,
        createdAt: new Date(),
      },
      {
        id: 'blog-tutorial-template',
        name: 'Blog Post - Tutorial Style',
        type: 'blog',
        description: 'Perfect for step-by-step guides',
        content: `# How to [Do Something]

## Prerequisites
- Requirement 1
- Requirement 2

## Step 1: [First Step]
Detailed instructions for step 1.

\`\`\`
code example here
\`\`\`

## Step 2: [Second Step]
Detailed instructions for step 2.

## Step 3: [Third Step]
Detailed instructions for step 3.

## Troubleshooting
Common issues and solutions.

## Summary
Recap what you learned.`,
        createdAt: new Date(),
      },
      {
        id: 'page-landing-template',
        name: 'Landing Page Template',
        type: 'page',
        description: 'Conversion-focused landing page',
        content: `# [Your Headline]

## Subheading
Brief value proposition or hook.

## Problem
What challenge does your offer solve?

## Solution
How you solve that problem.

## Features
- Feature 1
- Feature 2
- Feature 3

## Benefits
- Benefit 1
- Benefit 2
- Benefit 3

## Testimonial
"Quote from satisfied customer" — Name, Title

## Call to Action
Click below to get started!`,
        createdAt: new Date(),
      },
    ];
  }
}

export const templateService = new TemplateService();
