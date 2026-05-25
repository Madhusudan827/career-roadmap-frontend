"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar, MobileHeader } from "@/components/sidebar";
import { careerRoles, roadmapData, stageNames } from "@/lib/data";

export default function DashboardPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
   const [completedTopics, setCompletedTopics] = useState<string[]>([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [roadmaps, setRoadmaps] = useState<any[]>([]);
 useEffect(() => {

  const storedRole = localStorage.getItem("selectedRole");
  const storedCompleted = localStorage.getItem("completedTopics");

  if (storedRole) {
    setSelectedRole(storedRole);

   fetch(`https://career-roadmap-backend-production.up.railway.app/api/roadmaps/${storedRole}`)
      .then((res) => res.json())
      .then((data) => {
        setRoadmaps(data);
      });
  }

  if (storedCompleted) {
    setCompletedTopics(JSON.parse(storedCompleted));
  }

  setIsLoaded(true);

}, []);

  const role = careerRoles.find((r) => r.id === selectedRole);
  const topics = selectedRole ? roadmapData[selectedRole] || [] : [];
  const totalTopics = topics.length;
  const completedCount = completedTopics.filter((id) =>
    topics.some((t) => t.id === id)
  ).length;
  const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Get next topic to learn
  const nextTopic = topics.find((t) => !completedTopics.includes(t.id));

  // Get recently completed (last 3)
  const recentlyCompleted = topics
    .filter((t) => completedTopics.includes(t.id))
    .slice(-3)
    .reverse();

  // Get topics by stage for overview
  const topicsByStage = topics.reduce((acc, topic) => {
    if (!acc[topic.stage]) acc[topic.stage] = [];
    acc[topic.stage].push(topic);
    return acc;
  }, {} as Record<number, typeof topics>);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">No Career Path Selected</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a career path to start your learning journey
        </p>
        <Link
          href="/register"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Select a Path
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar selectedRole={selectedRole} progress={progress} />
      <MobileHeader selectedRole={selectedRole} progress={progress} />

      <main className="pt-28 lg:pl-64 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Welcome back!
            </h1>
            <p className="mt-1 text-muted-foreground">
              {"Let's continue your journey as a"} <span className="text-primary font-medium">{role?.title}</span>
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
                  {role?.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Career Path</p>
                  <p className="font-semibold text-card-foreground">{role?.title}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="font-semibold text-card-foreground">{progress}%</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <svg className="h-5 w-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-semibold text-card-foreground">{completedCount} Topics</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <svg className="h-5 w-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="font-semibold text-card-foreground">{totalTopics - completedCount} Topics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Continue Learning Card */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-5">
                  <h2 className="text-lg font-semibold text-card-foreground">Continue Learning</h2>
                </div>
                {nextTopic ? (
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                        {nextTopic.stage}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {stageNames[nextTopic.stage]}
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {nextTopic.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {nextTopic.description}
                        </p>
                        <Link
                          href="/roadmap"
                          className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 text-center">
                    <div className="mb-3 flex justify-center">
                      <svg className="h-12 w-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">Congratulations!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {"You've completed all topics in this roadmap"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recently Completed */}
            <div className="rounded-xl border border-border bg-card">
              <div className="border-b border-border p-5">
                <h2 className="text-lg font-semibold text-card-foreground">Recently Completed</h2>
              </div>
              <div className="p-5">
                {recentlyCompleted.length > 0 ? (
                  <div className="space-y-3">
                    {recentlyCompleted.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                          <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-card-foreground">
                            {topic.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stageNames[topic.stage]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <svg className="mx-auto h-10 w-10 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="mt-2 text-sm text-muted-foreground">
                      No completed topics yet
                    </p>
                    <Link
                      href="/roadmap"
                      className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                    >
                      Start learning
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stage Overview */}
          <div className="mt-6 rounded-xl border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="text-lg font-semibold text-card-foreground">Learning Stages</h2>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5">
              <div className="grid gap-4">

  

</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
