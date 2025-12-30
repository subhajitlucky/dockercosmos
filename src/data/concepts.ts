export interface Concept {
  id: string
  title: string
  slug: string
  category: string
  shortDefinition: string
  mentalModel: string
  codeExample: string
  misconceptions: string[]
  relatedConcepts: string[]
  visualizationType: 'namespace' | 'cgroup' | 'filesystem' | 'lifecycle' | 'architecture' | 'comparison' | 'none'
}

export const conceptGroups = [
  'Container Fundamentals',
  'Isolation Mechanisms',
  'Images & Filesystems',
  'Runtime & Execution',
  'Networking',
  'Security & Limits',
  'Docker Workflow'
]

export const concepts: Concept[] = [
  {
    id: 'what-is-container',
    title: 'What is a Container',
    slug: 'what-is-a-container',
    category: 'Container Fundamentals',
    shortDefinition: 'A container is an isolated process that runs on a shared kernel.',
    mentalModel: 'Think of a container like a sealed shipping container on a ship. It has everything it needs inside (cargo), but shares the ship\'s engine and hull (kernel) with other containers.',
    codeExample: `# Containers are just processes
# Run a container and see its PID
docker run --name demo nginx
docker exec demo ps aux

# The container process shows up in host's process list
# But it runs in its own isolated namespace`,
    misconceptions: [
      'Containers are not lightweight VMs',
      'Containers don\'t have their own kernel',
      'Containers don\'t boot up - they start instantly'
    ],
    relatedConcepts: ['containers-vs-vms', 'docker-overview', 'processes-in-containers'],
    visualizationType: 'none'
  },
  {
    id: 'containers-vs-vms',
    title: 'Containers vs Virtual Machines',
    slug: 'containers-vs-virtual-machines',
    category: 'Container Fundamentals',
    shortDefinition: 'Containers share the host OS kernel while VMs run complete guest OS instances.',
    mentalModel: 'VMs are like having separate apartments (each with its own kitchen, bathroom, etc.), while containers are like rooms in a shared house with a common kitchen but private bedrooms. VMs virtualize hardware, containers virtualize the OS.',
    codeExample: `# VM: Each VM has its own kernel
┌─────────────────────────────────────┐
│  VM 1        │  VM 2        │  VM 3  │
│  ┌─────────┐ │  ┌─────────┐ │ ┌─────────┐ │
│  │ App A   │ │  │ App B   │ │ │ App C   │ │
│  ├─────────┤ │  ├─────────┤ │ ├─────────┤ │
│  │ Guest OS│ │  │ Guest OS│ │ │ Guest OS│ │
│  ├─────────┤ │  ├─────────┤ │ ├─────────┤ │
│  │ Hypervisor (heavy!)            │ │
│  └─────────────────────────────────┘ │
│           Host Hardware              │
└─────────────────────────────────────┘

# Container: All share host kernel
┌─────────────────────────────────────┐
│  Container 1 │ Container 2 │Container 3│
│  ┌─────────┐ │ ┌─────────┐ │ ┌─────────┐ │
│  │ App A   │ │ │ App B   │ │ │ App C   │ │
│  ├─────────┤ │ ├─────────┤ │ ├─────────┤ │
│  │ Libs    │ │ │ Libs    │ │ │ Libs    │ │
│  └─────────┘ │ └─────────┘ │ └─────────┘ │
│        └── Container Engine ──'        │
│           Host OS (shared!)            │
│           Host Hardware                │
└─────────────────────────────────────┘`,
    misconceptions: [
      'Containers are just lightweight VMs',
      'Containers provide the same isolation as VMs',
      'Containers can run different OS than the host'
    ],
    relatedConcepts: ['what-is-container', 'why-containers-not-vms'],
    visualizationType: 'comparison'
  },
  {
    id: 'docker-overview',
    title: 'Docker Overview',
    slug: 'docker-overview',
    category: 'Docker Workflow',
    shortDefinition: 'Docker is a platform that packages applications in containers using a client-daemon architecture.',
    mentalModel: 'Think of Docker as a delivery company. The Docker Client is like the dispatcher taking orders, the Docker Daemon is the warehouse manager building and shipping containers, and the Registry is like a warehouse storing pre-built containers ready to ship.',
    codeExample: `# Docker Client (CLI) talks to Docker Daemon
docker build -t myapp .      # Client sends build command
docker run myapp             # Client sends run command

# Daemon does the work:
# 1. Pulls image from registry if needed
# 2. Creates container filesystem
# 3. Sets up namespaces & cgroups
# 4. Runs the process`,
    misconceptions: [
      'Docker is required to run containers',
      'docker run actually runs the container (the daemon does)',
      'Docker containers are the only way to run containers'
    ],
    relatedConcepts: ['docker-architecture', 'images-vs-containers', 'what-is-container'],
    visualizationType: 'architecture'
  },
  {
    id: 'docker-architecture',
    title: 'Docker Architecture',
    slug: 'docker-architecture',
    category: 'Docker Workflow',
    shortDefinition: 'Docker uses a client-server model with the CLI (client) communicating with the dockerd daemon.',
    mentalModel: 'Restaurant analogy: You (Client) order food, the Waiter takes your order to the Kitchen (Daemon), which prepares the meal. The Wine Cellar (Registry) stores pre-made recipes (images) that the Kitchen uses.',
    codeExample: `# Docker CLI (client)
docker build ./myapp          # Sends build request
docker push myregistry/myapp  # Sends push request
docker run nginx              # Sends run request

# Via Unix socket (/var/run/docker.sock)
# or network TCP port 2375/2376

# Docker Daemon (dockerd)
# - Manages images, containers, networks, volumes
# - Listens for Docker API requests
# - Communicates with containerd runtime`,
    misconceptions: [
      'The docker command runs containers directly',
      'Docker daemon runs inside containers',
      'There\'s only one Docker component'
    ],
    relatedConcepts: ['docker-overview', 'container-lifecycle', 'dockerfile-basics'],
    visualizationType: 'architecture'
  },
  {
    id: 'images-vs-containers',
    title: 'Images vs Containers',
    slug: 'images-vs-containers',
    category: 'Container Fundamentals',
    shortDefinition: 'An image is a read-only template; a container is a running instance of that image.',
    mentalModel: 'Image is like a cookie cutter (the template), container is the actual cookies made from it. You can make many cookies from one cutter, and each cookie can be customized with icing (your data).',
    codeExample: `# Image: The template (read-only)
docker pull ubuntu:20.04       # Downloads image layers
docker images                  # Lists stored images
# Image ID: sha256:abc123...

# Container: Running instance (writable layer)
docker run -it ubuntu:20.04    # Creates NEW container
# Make changes inside container
echo "Hello" > /test.txt
exit

# Original image unchanged!
docker run -it ubuntu:20.04    # Fresh container, no /test.txt

# All changes in running container saved in thin R/W layer`,
    misconceptions: [
      'Containers are images',
      'Images can be modified directly',
      'Deleting a container deletes the image'
    ],
    relatedConcepts: ['image-layers', 'what-is-container', 'copy-on-write'],
    visualizationType: 'none'
  },
  {
    id: 'image-layers',
    title: 'Image Layers',
    slug: 'image-layers',
    category: 'Images & Filesystems',
    shortDefinition: 'Docker images are built from stacked read-only layers, each representing a Dockerfile instruction.',
    mentalModel: 'Think of image layers like Git commits. Each layer builds on the previous one, and Docker efficiently reuses unchanged layers. The final image is the cumulative result of all layers.',
    codeExample: `# Dockerfile creates layers
FROM ubuntu:20.04              # Layer 0: Base
RUN apt-get update             # Layer 1
RUN apt-get install -y nginx   # Layer 2
COPY ./app /usr/share/nginx    # Layer 3
EXPOSE 80                      # Layer 4 (metadata)
CMD ["nginx", "-g", "daemon off;"]  # Layer 5

# Layers are shared between images
# Same base layer used by many images
# Only differences take extra space`,
    misconceptions: [
      'Each RUN creates a separate filesystem copy',
      'Layers are always loaded into memory entirely',
      'Modifying a layer modifies all dependent images'
    ],
    relatedConcepts: ['images-vs-containers', 'union-filesystem', 'copy-on-write'],
    visualizationType: 'filesystem'
  },
  {
    id: 'union-filesystem',
    title: 'Union Filesystem (OverlayFS)',
    slug: 'union-filesystem',
    category: 'Images & Filesystems',
    shortDefinition: 'OverlayFS stacks multiple read-only layers into a single unified view.',
    mentalModel: 'Like transparent sheets stacked on a light table. Each sheet has some content, and looking through all of them shows the combined result. New writes go on a fresh top sheet.',
    codeExample: `# OverlayFS structure
# upperdir (container layer - writable)
#   /app/config.txt (new file)
#   /lib/newlib.so (new)
#
# lowerdir (image layers - read-only)
#   layer3: /app (COPY)
#   layer2: /usr/lib (RUN apt install)
#   layer1: /etc (RUN apt update)
#   layer0: / (FROM ubuntu)

# Resulting merged view:
#   /etc, /usr, /lib, /app/config.txt
# All visible as one filesystem!`,
    misconceptions: [
      'OverlayFS copies files when modified',
      'All layers are merged into one big layer',
      'OverlayFS only works with Docker'
    ],
    relatedConcepts: ['image-layers', 'copy-on-write', 'filesystem-isolation'],
    visualizationType: 'filesystem'
  },
  {
    id: 'copy-on-write',
    title: 'Copy-on-Write',
    slug: 'copy-on-write',
    category: 'Images & Filesystems',
    shortDefinition: 'When a container modifies a file from an image layer, it copies it to its writable layer first.',
    mentalModel: 'Like borrowing a book from a library. You can\'t write in the library book, so you make a photocopy to annotate. Your notes only exist in your copy, not affecting the original.',
    codeExample: `# Container reads from image layer
cat /app/config.json    # Reads from lowerdir

# Container modifies the file
echo "new setting" >> /app/config.json

# Copy-on-write happens:
# 1. File copied to upperdir (writable layer)
# 2. Original in lowerdir unchanged
# 3. Container now reads modified copy

# Benefits:
# - Original image preserved
# - Multiple containers can have different versions
# - Efficient: unchanged files stay shared`,
    misconceptions: [
      'Copy-on-write copies the entire filesystem',
      'Write performance is identical to native disks',
      'All files are copied, not just modified ones'
    ],
    relatedConcepts: ['image-layers', 'union-filesystem', 'volumes'],
    visualizationType: 'filesystem'
  },
  {
    id: 'processes-in-containers',
    title: 'Processes in Containers',
    slug: 'processes-in-containers',
    category: 'Runtime & Execution',
    shortDefinition: 'Containers run as normal processes on the host, just in isolated namespaces.',
    mentalModel: 'A container is a process with superpowers. It thinks it\'s alone on the machine (PID 1!), but really it\'s just a regular process you can see with `ps aux` on the host.',
    codeExample: `# On host - see container processes
ps aux | grep nginx
# root 1234 0.0 0.1 ... /docker-proxy
# root 1256 0.0 0.2 ... nginx: master process
# nginx 1299 0.0 0.1 ... nginx: worker process

# Inside container
docker exec -it mycontainer ps aux
# PID 1 nginx: master process
# PID 7 nginx: worker process
# PID 12 /bin/sh

# Host sees different PIDs!
# Container sees PID 1, 7, 12...`,
    misconceptions: [
      'Container processes are invisible on the host',
      'Containers have their own process table',
      'All processes in a container have PID 1'
    ],
    relatedConcepts: ['pid-namespace', 'what-is-container', 'container-lifecycle'],
    visualizationType: 'lifecycle'
  },
  {
    id: 'pid-namespace',
    title: 'PID Namespace',
    slug: 'pid-namespace',
    category: 'Isolation Mechanisms',
    shortDefinition: 'PID namespace creates an isolated process hierarchy where containers see their own PID 1 as the root.',
    mentalModel: 'Each container gets its own private room with its own process family tree. Inside the room, the main process is the "parent of all", but outside the room, it\'s just another process in the hotel hallway.',
    codeExample: `# Host sees full process tree
pstree -p
# init(1)-+-docker-proxy(1234)
#         |-containerd(567)
#         |   |-containerd-shim(890)
#         |       |-nginx(1234)    <-- Container's PID 1

# Container sees only its tree
docker exec container pstree
# nginx(1)-+-nginx(7)
#          |-sh(12)

# Can also share host PID namespace
docker run --pid=host nginx
# Now sees ALL host processes`,
    misconceptions: [
      'PID namespace hides processes from the host',
      'Process IDs are globally unique only within the container',
      'Containers can\'t see host processes at all'
    ],
    relatedConcepts: ['processes-in-containers', 'what-is-container'],
    visualizationType: 'namespace'
  },
  {
    id: 'mount-namespace',
    title: 'Mount Namespace',
    slug: 'mount-namespace',
    category: 'Isolation Mechanisms',
    shortDefinition: 'Mount namespace provides each container with its own root filesystem view.',
    mentalModel: 'Like having your own private bathroom. The plumbing connects to the same building supply, but what you see and use is completely separate from what others see in their bathrooms.',
    codeExample: `# Host mounts
mount
# /dev/sda1 on / ext4
# /dev/sda2 on /home ext4
# overlay on /var/lib/docker overlay

# Container mounts (inside)
mount
# overlay on / overlay
# proc on /proc proc
# tmpfs on /dev tmpfs

# Bind mount from host
docker run -v /host/path:/container/path myimage
# /host/path now visible at /container/path`,
    misconceptions: [
      'Mount namespace means completely separate disks',
      'Containers can\'t access host files unless bind mounted',
      'All mounts are private and hidden from host'
    ],
    relatedConcepts: ['filesystem-isolation', 'volumes'],
    visualizationType: 'namespace'
  },
  {
    id: 'network-namespace',
    title: 'Network Namespace',
    slug: 'network-namespace',
    category: 'Isolation Mechanisms',
    shortDefinition: 'Network namespace gives containers their own network interfaces, routing tables, and ports.',
    mentalModel: 'Each container gets its own private telephone network. Container A can have IP 10.0.0.2 with port 80, and Container B can also have IP 10.0.0.2 with port 80 - they never conflict because they\'re on separate networks.',
    codeExample: `# Host network interfaces
ip link show
# eth0: 192.168.1.100
# docker0: 172.17.0.1
# vethabc123@if45: <-- virtual ethernet to container

# Container network
docker exec container ip link show
# eth0@if46: 172.17.0.2
# lo: 127.0.0.1

# Container sees its own IP, routes, iptables
docker exec container ip route
# default via 172.17.0.1
# 172.17.0.0/16 via eth0`,
    misconceptions: [
      'Network namespace isolates ports globally',
      'Container IP addresses are globally routable',
      'Containers can\'t communicate without explicit linking'
    ],
    relatedConcepts: ['container-networking', 'port-mapping'],
    visualizationType: 'namespace'
  },
  {
    id: 'user-namespace',
    title: 'User Namespace',
    slug: 'user-namespace',
    category: 'Isolation Mechanisms',
    shortDefinition: 'User namespace maps UIDs/GIDs between container and host, allowing non-root container processes to map to root on host.',
    mentalModel: 'Like a theater with different seat numbers for different sections. The person in seat A1 in the balcony thinks they\'re front row center, but physically they\'re actually in the balcony. Their view is adjusted for their perspective.',
    codeExample: `# Without user namespace (default)
# Container root (UID 0) = Host root (UID 0)
docker run --user 1000:1000 myimage
# user in container = user 1000 on host

# With user namespace remapping
# /etc/docker/daemon.json
# { "userns-remap": "default" }

# Container sees:
# uid=0(root) gid=0(root)
# But on host:
# uid=100000(root) gid=100000(root)

# Process can't escape to host as root!`,
    misconceptions: [
      'User namespace makes containers truly rootless',
      'UIDs inside container are always the same as host',
      'User namespace replaces all other security measures'
    ],
    relatedConcepts: ['container-security', 'pid-namespace'],
    visualizationType: 'namespace'
  },
  {
    id: 'ipc-namespace',
    title: 'IPC Namespace',
    slug: 'ipc-namespace',
    category: 'Isolation Mechanisms',
    shortDefinition: 'IPC namespace isolates inter-process communication resources like shared memory and semaphores.',
    mentalModel: 'Imagine separate meeting rooms in a building. Container A\'s meeting in Room 1 can\'t hear or interact with Container B\'s meeting in Room 2, even though they\'re in the same building.',
    codeExample: `# Host IPC
ipcs -m
# Shared memory segments...
# Semaphores...

# Container sees only its IPC
docker exec container ipcs -m
# (empty, unless created inside container)

# Two containers CAN share IPC if linked
docker run --ipc=container:other nginx
# Now shares IPC namespace with other`,
    misconceptions: [
      'IPC isolation prevents all inter-container communication',
      'Containers can never share memory with each other',
      'IPC namespace and shared memory are the same thing'
    ],
    relatedConcepts: ['processes-in-containers'],
    visualizationType: 'namespace'
  },
  {
    id: 'uts-namespace',
    title: 'UTS Namespace',
    slug: 'uts-namespace',
    category: 'Isolation Mechanisms',
    shortDefinition: 'UTS namespace isolates hostname and domain name, letting containers have their own identity.',
    mentalModel: 'Like having your own business cards. Even though you work in the same office building, you can present different identities to different clients.',
    codeExample: `# Host hostname
hostname
# docker-host

# Container hostname
docker run -h mycontainer nginx hostname
# mycontainer

# Inside container
uname -n
# mycontainer

# Can change at runtime
docker exec container hostname newname
# /etc/hostname updated
# hostname command returns newname`,
    misconceptions: [
      'UTS namespace changes the actual machine hostname',
      'Containers can never have the same hostname',
      'Hostname isolation has security implications'
    ],
    relatedConcepts: ['network-namespace'],
    visualizationType: 'namespace'
  },
  {
    id: 'cgroups',
    title: 'cgroups (Control Groups)',
    slug: 'cgroups',
    category: 'Security & Limits',
    shortDefinition: 'cgroups limit, account for, and isolate resource usage (CPU, memory, IO) of process groups.',
    mentalModel: 'Think of cgroups like a cafeteria meal plan. Each person gets a limited amount of food (calories = CPU/memory). Even if they\'re all eating from the same kitchen (kernel), no one can take more than their allotted portion.',
    codeExample: `# View cgroups on host
ls /sys/fs/cgroup/
# cpu, cpuacct, memory, blkio, pids...

# Container cgroup
docker run --cpu-shares=512 --memory=512m nginx
# Creates cgroup: /sys/fs/cgroup/docker/<id>/

# Check limits
cat /sys/fs/cgroup/docker/<id>/memory.limit_in_bytes
# 536870912 (= 512 MB)

# Check usage
cat /sys/fs/cgroup/docker/<id>/memory.usage_in_bytes
# 24567890 bytes (~23 MB)`,
    misconceptions: [
      'cgroups and namespaces are the same thing',
      'cgroups provide isolation',
      'cgroups can be bypassed by processes'
    ],
    relatedConcepts: ['resource-limits', 'cgroups'],
    visualizationType: 'cgroup'
  },
  {
    id: 'resource-limits',
    title: 'Resource Limits',
    slug: 'resource-limits',
    category: 'Security & Limits',
    shortDefinition: 'Docker allows setting CPU, memory, IO, and process limits to prevent container resource abuse.',
    mentalModel: 'Like a landlord setting utility caps. Each tenant (container) gets maximum electricity (CPU cycles), water (memory), and bandwidth (IO). If they exceed their limit, service is throttled or cut off.',
    codeExample: `# CPU limits
docker run --cpus=1.5 nginx              # Max 1.5 CPUs
docker run --cpu-shares=512 nginx        # 50% of default 1024
docker run --cpuset-cpus="0,2" nginx     # Pin to CPUs 0 and 2

# Memory limits
docker run --memory=256m nginx           # Max 256 MB RAM
docker run --memory-swap=512m nginx      # Max 512 MB with swap

# IO limits
docker run --blkio-weight=500 nginx      # Block IO weight

# Process limit
docker run --pids-limit=100 nginx        # Max 100 processes`,
    misconceptions: [
      'Unlimited containers use unlimited resources',
      'CPU limits work like VM CPU allocation',
      'Memory limit causes OOM kill immediately'
    ],
    relatedConcepts: ['cgroups', 'container-security'],
    visualizationType: 'cgroup'
  },
  {
    id: 'filesystem-isolation',
    title: 'Filesystem Isolation',
    slug: 'filesystem-isolation',
    category: 'Isolation Mechanisms',
    shortDefinition: 'Containers have isolated views of the filesystem, preventing access to host files unless explicitly shared.',
    mentalModel: 'Each container lives in its own sealed room. They can\'t see or touch files in other rooms or the hallway unless someone leaves a window open (bind mount).',
    codeExample: `# Default isolation
docker run ubuntu ls /host
# ls: /host: No such file or directory

# Bind mount specific path
docker run -v /etc:/host-etc ubuntu ls /host-etc
# Shows /etc from host!

# Read-only mount
docker run -v /etc:/host-etc:ro ubuntu touch /host-etc/test
# touch: cannot touch '/host-etc/test': Read-only file system

# Volume (managed by Docker)
docker run -v myvolume:/data myimage
# Decoupled from host filesystem`,
    misconceptions: [
      'Containers are completely isolated from host filesystem',
      'Root in container = root on host filesystem access',
      'All paths work the same in containers'
    ],
    relatedConcepts: ['mount-namespace', 'volumes', 'copy-on-write'],
    visualizationType: 'filesystem'
  },
  {
    id: 'container-networking',
    title: 'Container Networking',
    slug: 'container-networking',
    category: 'Networking',
    shortDefinition: 'Docker networks enable container-to-container and container-to-host communication with isolation.',
    mentalModel: 'Think of Docker networks as different neighborhood zones. Containers in the same zone can visit each other freely. Containers in different zones need to go through a gateway (bridge) to communicate.',
    codeExample: `# Network types
docker network create mybridge          # Bridge network
docker network create --driver overlay myswarm  # Overlay (swarm)

# Connect containers to network
docker run --network=mybridge --name=web nginx
docker run --network=mybridge --name=api myapi

# Inside web container
curl http://api                    # DNS resolution works!
# Container names are DNS entries

# Inspect network
docker network inspect mybridge
# Shows: Containers, IPAM config, Subnet, Gateway`,
    misconceptions: [
      'All containers are on the same network by default',
      'Container IP addresses are persistent',
      'Docker networking works like traditional networking'
    ],
    relatedConcepts: ['network-namespace', 'port-mapping', 'bridge-concept'],
    visualizationType: 'none'
  },
  {
    id: 'port-mapping',
    title: 'Port Mapping',
    slug: 'port-mapping',
    category: 'Networking',
    shortDefinition: 'Port mapping exposes container ports to the host, enabling external access via iptables NAT rules.',
    mentalModel: 'Like a hotel reception desk. Guests (requests) come to the building address, the receptionist (iptables) routes them to the correct room (container port) based on the room number they asked for.',
    codeExample: `# Publish port
docker run -p 8080:80 nginx
# Host:8080 -> Container:80

# Check mapping
docker port mycontainer
# 80/tcp -> 0.0.0.0:8080

# Random port assignment
docker run -P nginx
# Host:32768 -> Container:80 (random)

# Specific IP binding
docker run -p 127.0.0.1:8080:80 nginx
# Only accessible via localhost:8080

# iptables rules created automatically
# iptables -t nat -L DOCKER`,
    misconceptions: [
      'Port mapping creates a direct connection',
      'Container ports are globally unique',
      'Published ports are the only way to access containers'
    ],
    relatedConcepts: ['container-networking', 'network-namespace'],
    visualizationType: 'none'
  },
  {
    id: 'volumes',
    title: 'Volumes vs Bind Mounts',
    slug: 'volumes-vs-bind-mounts',
    category: 'Images & Filesystems',
    shortDefinition: 'Volumes are Docker-managed storage; bind mounts map host paths into containers.',
    mentalModel: 'Think of volumes as portable moving boxes (Docker manages them). Bind mounts are like leaving your closet door open for someone else to access your clothes directly.',
    codeExample: `# Volume (Docker-managed)
docker volume create mydata
docker run -v mydata:/data myapp
# Stored at /var/lib/docker/volumes/mydata/_data

# Bind mount (host path)
docker run -v /host/path:/container/path myapp
# Direct access to /host/path

# tmpfs (in-memory)
docker run --tmpfs /run:rw,size=128m myapp
# Stored in RAM only!

# Use cases
# - Volume: Database data (persistent, managed)
# - Bind mount: Config files (host-managed)
# - tmpfs: Secrets, sensitive data`,
    misconceptions: [
      'Volumes are always faster than bind mounts',
      'Bind mounts are not persisted anywhere',
      'Volumes and bind mounts work identically'
    ],
    relatedConcepts: ['filesystem-isolation', 'copy-on-write'],
    visualizationType: 'filesystem'
  },
  {
    id: 'dockerfile-basics',
    title: 'Dockerfile Basics',
    slug: 'dockerfile-basics',
    category: 'Docker Workflow',
    shortDefinition: 'Dockerfile is a script defining how to build a container image layer by layer.',
    mentalModel: 'Like a recipe. Each instruction (step) adds ingredients (layers) to create the final dish (image). Following the recipe exactly always produces the same result.',
    codeExample: `# Simple Dockerfile
FROM node:18-alpine              # Base image
WORKDIR /app                     # Set working dir
COPY package*.json ./            # Copy deps files
RUN npm ci --only=production     # Install deps
COPY . .                         # Copy source
EXPOSE 3000                     # Document port
ENV NODE_ENV=production         # Set env var
USER node                       # Switch to non-root
CMD ["node", "server.js"]       # Run command

# Build and run
docker build -t myapp .
docker run -p 3000:3000 myapp`,
    misconceptions: [
      'Dockerfile commands are executed at runtime',
      'ORDER of instructions doesn\'t matter',
      'Every RUN creates a new layer that cannot be optimized'
    ],
    relatedConcepts: ['image-layers', 'docker-architecture', 'build-vs-run'],
    visualizationType: 'none'
  },
  {
    id: 'build-vs-run',
    title: 'Build vs Run',
    slug: 'build-vs-run',
    category: 'Docker Workflow',
    shortDefinition: 'Build creates images from Dockerfiles; run creates and starts containers from images.',
    mentalModel: 'Build is like manufacturing a product according to blueprints (Dockerfile). Run is like opening and using that product. You build once, can run many times.',
    codeExample: `# BUILD: Create image from Dockerfile
docker build -t myapp:latest .
# 1. Execute each instruction
# 2. Cache unchanged layers
# 3. Create final image manifest
# 4. Store in local image registry

# RUN: Create container from image
docker run -d -p 8080:3000 --name myapp myapp:latest
# 1. Create thin writable layer
# 2. Set up namespaces
# 3. Apply cgroup limits
# 4. Execute CMD/ENTRYPOINT

# Same image, different runs = different containers
docker run myapp    # Container A
docker run myapp    # Container B (completely separate!)`,
    misconceptions: [
      'docker build and docker run both create containers',
      'docker run can modify the image',
      'Build happens every time you run'
    ],
    relatedConcepts: ['dockerfile-basics', 'images-vs-containers', 'container-lifecycle'],
    visualizationType: 'lifecycle'
  },
  {
    id: 'container-lifecycle',
    title: 'Container Lifecycle',
    slug: 'container-lifecycle',
    category: 'Runtime & Execution',
    shortDefinition: 'Containers go through created → running → stopped states, with restart policies controlling recovery.',
    mentalModel: 'Like a light switch. Created is the switch being wired up. Running is the light on. Stopped is the light off (but the wiring exists). You can turn it on and off many times.',
    codeExample: `# Create container (not running)
docker create --name myapp myimage
# Status: Created

# Start container
docker start myapp
# Status: Running

# Stop container (graceful)
docker stop myapp
# Status: Exited (0)

# Kill container (force)
docker kill myapp
# Status: Exited (137)

# Restart with policy
docker run -d --restart=unless-stopped nginx
# Starts on daemon startup
# Unless explicitly stopped by user

# Remove stopped container
docker rm myapp
# Gone forever (unless committed first!)`,
    misconceptions: [
      'docker run creates a running AND a stopped container',
      'Stopped containers don\'t use resources',
      'docker stop always loses data'
    ],
    relatedConcepts: ['processes-in-containers', 'images-vs-containers'],
    visualizationType: 'lifecycle'
  },
  {
    id: 'container-security',
    title: 'Container Security Basics',
    slug: 'container-security',
    category: 'Security & Limits',
    shortDefinition: 'Container security involves minimizing attack surface, using least privilege, and defense in depth.',
    mentalModel: 'Castle defense strategy. Your container is the castle: use a small foundation (minimal image), few gates (limited capabilities), check visitors (read-only filesystem), and run guards outside (SELinux/seccomp).',
    codeExample: `# Security best practices
FROM node:18-alpine                  # Small base
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup   # Non-root user
USER appuser                         # Switch to non-root

# Limit capabilities
docker run --cap-drop=ALL nginx      # Drop all capabilities
docker run --cap-add=NET_BIND_SERVICE \
    nginx                            # Add only what's needed

# Read-only root filesystem
docker run --read-only nginx

# Seccomp profile
docker run --security-opt=seccomp=profile.json nginx

# No new privileges
docker run --security-opt=no-new-privileges myapp`,
    misconceptions: [
      'Containers are secure by default',
      'Running as non-root makes containers secure',
      'One security measure is enough'
    ],
    relatedConcepts: ['user-namespace', 'resource-limits', 'cgroups'],
    visualizationType: 'none'
  },
  {
    id: 'why-containers-not-vms',
    title: 'Why Containers Are Not VMs',
    slug: 'why-containers-not-vms',
    category: 'Container Fundamentals',
    shortDefinition: 'Containers share the host kernel and start instantly; VMs virtualize hardware and boot complete OS.',
    mentalModel: 'Container is like a Zoom meeting (share one screen, instant join). VM is like giving everyone their own computer (full setup, boot time, independent OS). Same task, completely different resource model.',
    codeExample: `# VM startup time
# 1. Boot BIOS/UEFI (~2-5 sec)
# 2. Boot bootloader (~1-2 sec)
# 3. Boot Guest OS kernel (~10-30 sec)
# Total: 15-40+ seconds

# Container startup time
# 1. Create container (~50-200ms)
# 2. Start process (~10-50ms)
# Total: < 250 milliseconds

# Resource overhead
# VM: Full OS footprint (GBs RAM, GBs disk)
# Container: Just the process and deps (MBs RAM, MBs disk)

# Example: nginx
# VM: ~100+ MB RAM overhead
# Container: ~10-20 MB RAM overhead`,
    misconceptions: [
      'Containers are just lightweight VMs',
      'Containers can run Windows on Linux (or vice versa)',
      'VMs are more secure, containers are less secure'
    ],
    relatedConcepts: ['containers-vs-vms', 'what-is-container', 'docker-overview'],
    visualizationType: 'comparison'
  },
  {
    id: 'environment-variables',
    title: 'Environment Variables',
    slug: 'environment-variables',
    category: 'Runtime & Execution',
    shortDefinition: 'Environment variables pass configuration to containers without hardcoding values in images.',
    mentalModel: 'Like sticky notes on a computer monitor. They provide information to programs without being part of the program itself. Easy to change, visible to all processes in the container.',
    codeExample: `# Set env var
docker run -e DATABASE_URL=postgres://... myapp
docker run -e VAR1=value1 -e VAR2=value2 myapp
docker run --env-file .env myapp

# In Dockerfile
ENV NODE_ENV=production
ENV APP_VERSION=1.0.0

# In docker-compose.yml
environment:
  - DATABASE_URL=postgres://...
  - NODE_ENV=${"${"}NODE_ENV:-development{"}"}

# View env vars in container
docker exec mycontainer env
# DATABASE_URL=postgres://...
# NODE_ENV=production
# PATH=/usr/local/sbin:...`,
    misconceptions: [
      'Environment variables are private/secret',
      'ENV in Dockerfile can\'t be overridden',
      'All env vars are visible to all processes'
    ],
    relatedConcepts: ['dockerfile-basics', 'docker-architecture'],
    visualizationType: 'none'
  }
]

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find(c => c.slug === slug)
}

export function getConceptsByCategory(category: string): Concept[] {
  return concepts.filter(c => c.category === category)
}
