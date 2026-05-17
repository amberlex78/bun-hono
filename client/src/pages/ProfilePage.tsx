import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  email: z.string().email("Enter a valid email"),
  displayName: z.string().min(2, "Display name must be at least 2 characters")
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfilePage() {
  const [result, setResult] = useState<ProfileFormValues | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: "user@example.com",
      displayName: "Regular User"
    }
  });

  const onSubmit = (values: ProfileFormValues) => {
    setResult(values);
  };

  return (
    <main className="container">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>shadcn/ui check: Card + Form + Button</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 pt-2">
                <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6 max-w-xl">
          <CardHeader>
            <CardTitle>Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
