# vitepress<Badge type="info" text="default" />
### Title<Badge type="tip" text="^1.9.0" />
### Title<Badge type="warning" text="beta" />
### Title<Badge type="danger" text="caution" />
### Title <Badge type="info">custom element</Badge>



<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />