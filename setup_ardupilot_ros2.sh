#!/bin/bash

# Script to set up ArduPilot with ROS 2 Humble and Gazebo (GZ) on Ubuntu 22.04
set -e

echo "Starting setup process..."

# Update and set locale

echo "Updating system and setting locale..."

sudo apt update && sudo apt install -y locales curl git software-properties-common wget

sudo locale-gen en_US en_US.UTF-8

sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8

export LANG=en_US.UTF-8

# Install development tools

echo "Installing development tools..."

sudo apt install -y build-essential python3 python3-pip python3-rosdep python3-colcon-common-extensions default-jre

# Install ROS 2 Humble

echo "Installing ROS 2 Humble..."

sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] \

http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update

sudo apt install -y ros-humble-desktop

echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc

source /opt/ros/humble/setup.bash

# Initialize rosdep

echo "Initializing rosdep..."

sudo rosdep init

rosdep update

# Create ROS 2 workspace

echo "Creating ROS 2 workspace..."

mkdir -p ~/ros2_ws/src

cd ~/ros2_ws/src

git clone https://github.com/ros/ros_tutorials.git -b humble

cd ~/ros2_ws

rosdep install -i --from-path src --rosdistro humble -y

colcon build

echo "source ~/ros2_ws/install/local_setup.bash" >> ~/.bashrc

source ~/.bashrc

# Install ArduPilot prerequisites

echo "Installing ArduPilot prerequisites..."

git clone --recurse-submodules https://github.com/ravenousdox/ardupilot ~/ardupilot

cd ~/ardupilot

Tools/environment_install/install-prereqs-ubuntu.sh -y

source ~/.profile

source ~/.bashrc

# Build ArduPilot

echo "Building ArduPilot..."

./waf configure --board speedybeef4v4

./waf copter

# Install vcs tool and import repositories

echo "Installing vcs tool and importing repositories..."

sudo apt install -y python3-vcstool

cd ~/ros2_ws

vcs import --recursive --input https://raw.githubusercontent.com/ArduPilot/ardupilot/master/Tools/ros2/ros2.repos src

rosdep install --from-paths src --ignore-src -r -y

# Install Micro-XRCE-DDS

echo "Installing Micro-XRCE-DDS..."

mkdir -p ~/ardu_ws

cd ~/ardu_ws

git clone --recurse-submodules https://github.com/ardupilot/Micro-XRCE-DDS-Gen.git

cd Micro-XRCE-DDS-Gen

./gradlew assemble

echo "export PATH=\$PATH:\$PWD/scripts" >> ~/.bashrc

source ~/.bashrc

# Build ROS packages

echo "Building ROS packages..."

cd ~/ros2_ws

colcon build --packages-up-to ardupilot_dds_tests

source ~/ros2_ws/install/setup.bash

source ~/ardu_ws/install/setup.bash

# Set up Gazebo (GZ)

echo "Setting up Gazebo (GZ)..."

vcs import --input https://raw.githubusercontent.com/ArduPilot/ardupilot_gz/main/ros2_gz.repos --recursive src

echo "export GZ_VERSION=harmonic" >> ~/.bashrc

source ~/.bashrc

rosdep install --from-paths src --ignore-src -r -y

colcon build --packages-up-to ardupilot_gz_bringup

# Clone additional ArduPilot ROS repositories

echo "Cloning additional ArduPilot ROS repositories..."

cd ~/ros2_ws/src

git clone git@github.com:ArduPilot/ardupilot_ros.git

cd ~/ros2_ws

rosdep install --from-paths src --ignore-src -r --skip-keys gazebo-ros-pkgs

colcon build --packages-up-to ardupilot_ros ardupilot_gz_bringup

# Install additional ROS packages

echo "Installing additional ROS packages..."

sudo apt install -y ros-humble-rtabmap-ros ros-humble-navigation2 ros-humble-nav2-bringup ros-humble-nav2-minimal-tb3 

# Finalize setup

echo "Finalizing setup..."

source ~/.bashrc

source /opt/ros/humble/setup.bash

source ~/ros2_ws/install/setup.bash

source ~/ardu_ws/install/setup.bash

echo "Setup completed successfully!"