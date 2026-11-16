export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          created_at: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      audit_contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          report_sent: boolean
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          report_sent?: boolean
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          report_sent?: boolean
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_contacts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "audit_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_insights: {
        Row: {
          ai_recommendations: string | null
          automation_readiness_score: number | null
          business_description: string | null
          business_type: string | null
          company_maturity: string | null
          created_at: string
          desired_solutions: Json | null
          goals: Json | null
          id: string
          industry: string | null
          painpoints: Json | null
          priority_recommendations: Json | null
          session_id: string
          target_audience: string | null
          team_size: string | null
          tools_used: Json | null
          updated_at: string
        }
        Insert: {
          ai_recommendations?: string | null
          automation_readiness_score?: number | null
          business_description?: string | null
          business_type?: string | null
          company_maturity?: string | null
          created_at?: string
          desired_solutions?: Json | null
          goals?: Json | null
          id?: string
          industry?: string | null
          painpoints?: Json | null
          priority_recommendations?: Json | null
          session_id: string
          target_audience?: string | null
          team_size?: string | null
          tools_used?: Json | null
          updated_at?: string
        }
        Update: {
          ai_recommendations?: string | null
          automation_readiness_score?: number | null
          business_description?: string | null
          business_type?: string | null
          company_maturity?: string | null
          created_at?: string
          desired_solutions?: Json | null
          goals?: Json | null
          id?: string
          industry?: string | null
          painpoints?: Json | null
          priority_recommendations?: Json | null
          session_id?: string
          target_audience?: string | null
          team_size?: string | null
          tools_used?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_insights_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "audit_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "audit_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_sessions: {
        Row: {
          created_at: string
          id: string
          status: string
          updated_at: string
          user_email: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_email?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_email?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
          ip_hash: string | null
          parent_id: string | null
          post_id: string
          status: Database["public"]["Enums"]["comment_status"]
        }
        Insert: {
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          ip_hash?: string | null
          parent_id?: string | null
          post_id: string
          status?: Database["public"]["Enums"]["comment_status"]
        }
        Update: {
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          ip_hash?: string | null
          parent_id?: string | null
          post_id?: string
          status?: Database["public"]["Enums"]["comment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_views: {
        Row: {
          id: string
          post_id: string
          referrer: string | null
          session_hash: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          post_id: string
          referrer?: string | null
          session_hash?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          referrer?: string | null
          session_hash?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          og_image: string | null
          published_at: string | null
          reading_time: number
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          og_image?: string | null
          published_at?: string | null
          reading_time?: number
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          og_image?: string | null
          published_at?: string | null
          reading_time?: number
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_settings: {
        Row: {
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          is_public?: boolean
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      business_insights: {
        Row: {
          created_at: string
          id: string
          insights: Json
          metrics: Json | null
          period_end: string
          period_start: string
          recommendations: string[] | null
          summary: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          insights: Json
          metrics?: Json | null
          period_end: string
          period_start: string
          recommendations?: string[] | null
          summary: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          insights?: Json
          metrics?: Json | null
          period_end?: string
          period_start?: string
          recommendations?: string[] | null
          summary?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_bookings: {
        Row: {
          attendees: Json | null
          booking_id: string
          booking_uid: string
          created_at: string
          description: string | null
          duration: number
          end_time: string
          id: string
          location: string | null
          meeting_url: string | null
          metadata: Json | null
          start_time: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attendees?: Json | null
          booking_id: string
          booking_uid: string
          created_at?: string
          description?: string | null
          duration: number
          end_time: string
          id?: string
          location?: string | null
          meeting_url?: string | null
          metadata?: Json | null
          start_time: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attendees?: Json | null
          booking_id?: string
          booking_uid?: string
          created_at?: string
          description?: string | null
          duration?: number
          end_time?: string
          id?: string
          location?: string | null
          meeting_url?: string | null
          metadata?: Json | null
          start_time?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          created_at: string | null
          cui: string | null
          email: string
          id: string
          name: string
          phone: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          cui?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          cui?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contracts: {
        Row: {
          clauses: string | null
          client_id: string
          client_signature_data: string | null
          client_signature_name: string | null
          client_signed_at: string | null
          contract_number: string
          contract_type: string
          created_at: string | null
          end_date: string | null
          fully_signed_at: string | null
          generated_contract: string | null
          id: string
          proposal_id: string | null
          provider_name: string | null
          provider_signature_data: string | null
          provider_signature_name: string | null
          provider_signed_at: string | null
          signature_link_expires_at: string | null
          signature_token: string | null
          start_date: string
          status: Database["public"]["Enums"]["contract_status"]
          terms: string | null
          total_value: number
          updated_at: string | null
        }
        Insert: {
          clauses?: string | null
          client_id: string
          client_signature_data?: string | null
          client_signature_name?: string | null
          client_signed_at?: string | null
          contract_number: string
          contract_type: string
          created_at?: string | null
          end_date?: string | null
          fully_signed_at?: string | null
          generated_contract?: string | null
          id?: string
          proposal_id?: string | null
          provider_name?: string | null
          provider_signature_data?: string | null
          provider_signature_name?: string | null
          provider_signed_at?: string | null
          signature_link_expires_at?: string | null
          signature_token?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["contract_status"]
          terms?: string | null
          total_value: number
          updated_at?: string | null
        }
        Update: {
          clauses?: string | null
          client_id?: string
          client_signature_data?: string | null
          client_signature_name?: string | null
          client_signed_at?: string | null
          contract_number?: string
          contract_type?: string
          created_at?: string | null
          end_date?: string | null
          fully_signed_at?: string | null
          generated_contract?: string | null
          id?: string
          proposal_id?: string | null
          provider_name?: string | null
          provider_signature_data?: string | null
          provider_signature_name?: string | null
          provider_signed_at?: string | null
          signature_link_expires_at?: string | null
          signature_token?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"]
          terms?: string | null
          total_value?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          description: string
          id: string
          invoice_id: string
          quantity: number
          total: number
          unit_price: number
          vat_rate: number
        }
        Insert: {
          description: string
          id?: string
          invoice_id: string
          quantity: number
          total: number
          unit_price: number
          vat_rate?: number
        }
        Update: {
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          total?: number
          unit_price?: number
          vat_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_template_items: {
        Row: {
          description: string
          id: string
          quantity: number
          template_id: string
          unit_price: number
          vat_rate: number
        }
        Insert: {
          description: string
          id?: string
          quantity?: number
          template_id: string
          unit_price?: number
          vat_rate?: number
        }
        Update: {
          description?: string
          id?: string
          quantity?: number
          template_id?: string
          unit_price?: number
          vat_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "invoice_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_templates: {
        Row: {
          bank_account: string | null
          bank_name: string | null
          company_address: string | null
          company_city: string | null
          company_cui: string | null
          company_name: string | null
          company_registration: string | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          notes: string | null
          payment_terms: string | null
          updated_at: string
        }
        Insert: {
          bank_account?: string | null
          bank_name?: string | null
          company_address?: string | null
          company_city?: string | null
          company_cui?: string | null
          company_name?: string | null
          company_registration?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          notes?: string | null
          payment_terms?: string | null
          updated_at?: string
        }
        Update: {
          bank_account?: string | null
          bank_name?: string | null
          company_address?: string | null
          company_city?: string | null
          company_cui?: string | null
          company_name?: string | null
          company_registration?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          notes?: string | null
          payment_terms?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          client_id: string
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          payment_terms: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          template_id: string | null
          total: number
          updated_at: string | null
          vat_amount: number
        }
        Insert: {
          client_id: string
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          notes?: string | null
          payment_terms?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          template_id?: string | null
          total: number
          updated_at?: string | null
          vat_amount: number
        }
        Update: {
          client_id?: string
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          payment_terms?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          template_id?: string | null
          total?: number
          updated_at?: string | null
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "invoice_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      "leadmagnet-audit-strategic": {
        Row: {
          automation_tools: Json | null
          automation_tools_other: string | null
          backoffice_employees: string | null
          budget: string | null
          business_type: string | null
          business_type_other: string | null
          company_name: string
          created_at: string
          cui: string | null
          daily_interactions: string | null
          daily_orders: string | null
          email: string
          employees_avoidable: string | null
          erp_software: string | null
          erp_software_other: string | null
          excel_count: string | null
          frustrations: string | null
          full_name: string
          has_crm: string | null
          has_website: string | null
          id: string
          impact_scale: number | null
          industry_questions: Json | null
          investment_recovery: string | null
          main_operational_problem: string | null
          motivation: string | null
          order_channels: Json | null
          order_channels_other: string | null
          phone: string
          platforms: Json | null
          platforms_other: string | null
          previous_digitalization: string | null
          revenue: string | null
          role_in_company: string | null
          source: string | null
          stock_tracking: string | null
          team_size: string | null
          time_lost: string | null
          website_url: string | null
          weekly_quotes: string | null
          weekly_repetitive_hours: string | null
          yearly_objective: string | null
        }
        Insert: {
          automation_tools?: Json | null
          automation_tools_other?: string | null
          backoffice_employees?: string | null
          budget?: string | null
          business_type?: string | null
          business_type_other?: string | null
          company_name: string
          created_at?: string
          cui?: string | null
          daily_interactions?: string | null
          daily_orders?: string | null
          email: string
          employees_avoidable?: string | null
          erp_software?: string | null
          erp_software_other?: string | null
          excel_count?: string | null
          frustrations?: string | null
          full_name: string
          has_crm?: string | null
          has_website?: string | null
          id?: string
          impact_scale?: number | null
          industry_questions?: Json | null
          investment_recovery?: string | null
          main_operational_problem?: string | null
          motivation?: string | null
          order_channels?: Json | null
          order_channels_other?: string | null
          phone: string
          platforms?: Json | null
          platforms_other?: string | null
          previous_digitalization?: string | null
          revenue?: string | null
          role_in_company?: string | null
          source?: string | null
          stock_tracking?: string | null
          team_size?: string | null
          time_lost?: string | null
          website_url?: string | null
          weekly_quotes?: string | null
          weekly_repetitive_hours?: string | null
          yearly_objective?: string | null
        }
        Update: {
          automation_tools?: Json | null
          automation_tools_other?: string | null
          backoffice_employees?: string | null
          budget?: string | null
          business_type?: string | null
          business_type_other?: string | null
          company_name?: string
          created_at?: string
          cui?: string | null
          daily_interactions?: string | null
          daily_orders?: string | null
          email?: string
          employees_avoidable?: string | null
          erp_software?: string | null
          erp_software_other?: string | null
          excel_count?: string | null
          frustrations?: string | null
          full_name?: string
          has_crm?: string | null
          has_website?: string | null
          id?: string
          impact_scale?: number | null
          industry_questions?: Json | null
          investment_recovery?: string | null
          main_operational_problem?: string | null
          motivation?: string | null
          order_channels?: Json | null
          order_channels_other?: string | null
          phone?: string
          platforms?: Json | null
          platforms_other?: string | null
          previous_digitalization?: string | null
          revenue?: string | null
          role_in_company?: string | null
          source?: string | null
          stock_tracking?: string | null
          team_size?: string | null
          time_lost?: string | null
          website_url?: string | null
          weekly_quotes?: string | null
          weekly_repetitive_hours?: string | null
          yearly_objective?: string | null
        }
        Relationships: []
      }
      page_leads: {
        Row: {
          created_at: string
          email: string
          extra: Json
          full_name: string
          id: string
          phone: string | null
          source: string
          source_path: string | null
        }
        Insert: {
          created_at?: string
          email: string
          extra?: Json
          full_name: string
          id?: string
          phone?: string | null
          source?: string
          source_path?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          extra?: Json
          full_name?: string
          id?: string
          phone?: string | null
          source?: string
          source_path?: string | null
        }
        Relationships: []
      }
      payable_invoices: {
        Row: {
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          payment_date: string | null
          pdf_file_path: string | null
          status: string
          supplier_cui: string | null
          supplier_name: string
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          notes?: string | null
          payment_date?: string | null
          pdf_file_path?: string | null
          status?: string
          supplier_cui?: string | null
          supplier_name: string
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          payment_date?: string | null
          pdf_file_path?: string | null
          status?: string
          supplier_cui?: string | null
          supplier_name?: string
          total?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      proposal_templates: {
        Row: {
          automation_needs_template: string | null
          business_type: string | null
          code_snippets: string | null
          created_at: string
          default_price: number | null
          description: string | null
          id: string
          name: string
          proposal_structure: string | null
          timeframe_template: string | null
          updated_at: string
        }
        Insert: {
          automation_needs_template?: string | null
          business_type?: string | null
          code_snippets?: string | null
          created_at?: string
          default_price?: number | null
          description?: string | null
          id?: string
          name: string
          proposal_structure?: string | null
          timeframe_template?: string | null
          updated_at?: string
        }
        Update: {
          automation_needs_template?: string | null
          business_type?: string | null
          code_snippets?: string | null
          created_at?: string
          default_price?: number | null
          description?: string | null
          id?: string
          name?: string
          proposal_structure?: string | null
          timeframe_template?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          automation_needs: string
          business_description: string
          business_name: string
          created_at: string
          generated_proposal: string | null
          id: string
          price: number
          status: string
          timeframe: string
          updated_at: string
        }
        Insert: {
          automation_needs: string
          business_description: string
          business_name: string
          created_at?: string
          generated_proposal?: string | null
          id?: string
          price: number
          status?: string
          timeframe: string
          updated_at?: string
        }
        Update: {
          automation_needs?: string
          business_description?: string
          business_name?: string
          created_at?: string
          generated_proposal?: string | null
          id?: string
          price?: number
          status?: string
          timeframe?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          description: string
          id: string
          quantity: number
          quote_id: string
          total: number
          unit_price: number
          vat_rate: number
        }
        Insert: {
          description: string
          id?: string
          quantity: number
          quote_id: string
          total: number
          unit_price: number
          vat_rate?: number
        }
        Update: {
          description?: string
          id?: string
          quantity?: number
          quote_id?: string
          total?: number
          unit_price?: number
          vat_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          client_id: string
          created_at: string | null
          discount: number | null
          id: string
          issue_date: string
          notes: string | null
          quote_number: string
          status: Database["public"]["Enums"]["quote_status"]
          subtotal: number
          terms: string | null
          total: number
          updated_at: string | null
          valid_until: string
          vat_amount: number
        }
        Insert: {
          client_id: string
          created_at?: string | null
          discount?: number | null
          id?: string
          issue_date?: string
          notes?: string | null
          quote_number: string
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal: number
          terms?: string | null
          total: number
          updated_at?: string | null
          valid_until: string
          vat_amount: number
        }
        Update: {
          client_id?: string
          created_at?: string | null
          discount?: number | null
          id?: string
          issue_date?: string
          notes?: string | null
          quote_number?: string
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal?: number
          terms?: string | null
          total?: number
          updated_at?: string | null
          valid_until?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          default_price: number | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          default_price?: number | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          default_price?: number | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      blog_comments_public: {
        Row: {
          author_name: string | null
          content: string | null
          created_at: string | null
          id: string | null
          parent_id: string | null
          post_id: string | null
        }
        Insert: {
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          parent_id?: string | null
          post_id?: string | null
        }
        Update: {
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          parent_id?: string | null
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_post_view: {
        Args: { _referrer?: string; _session: string; _slug: string }
        Returns: undefined
      }
      is_blog_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user" | "editor"
      comment_status: "pending" | "approved" | "spam"
      contract_status:
        | "draft"
        | "active"
        | "pending"
        | "expired"
        | "terminated"
        | "signed"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      post_status: "draft" | "scheduled" | "published" | "archived"
      quote_status: "draft" | "sent" | "accepted" | "rejected" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "editor"],
      comment_status: ["pending", "approved", "spam"],
      contract_status: [
        "draft",
        "active",
        "pending",
        "expired",
        "terminated",
        "signed",
      ],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      post_status: ["draft", "scheduled", "published", "archived"],
      quote_status: ["draft", "sent", "accepted", "rejected", "expired"],
    },
  },
} as const
