package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        string         `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Name      string         `json:"name"`
	Email     string         `gorm:"uniqueIndex" json:"email"`
	Role      string         `gorm:"default:'student'" json:"role"`
	GithubID  string         `gorm:"uniqueIndex" json:"githubId"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Project struct {
	ID            string         `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	UserID        string         `gorm:"type:uuid;index" json:"userId"`
	User          User           `gorm:"foreignKey:UserID" json:"-"`
	Name          string         `json:"name"`
	Slug          string         `gorm:"uniqueIndex" json:"slug"`
	RepoUrl       string         `json:"repoUrl"`
	Branch        string         `json:"branch"`
	Runtime       string         `json:"runtime"`
	BuildCommand  string         `json:"buildCommand"`
	StartCommand  string         `json:"startCommand"`
	RootDirectory string         `json:"rootDirectory"`
	PublicDomain  string         `gorm:"uniqueIndex" json:"publicDomain"`
	InternalPort  int            `json:"internalPort"`
	Status        string         `gorm:"default:'pending'" json:"status"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

type Deployment struct {
	ID          string         `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ProjectID   string         `gorm:"type:uuid;index" json:"projectId"`
	Project     Project        `gorm:"foreignKey:ProjectID" json:"-"`
	CommitSha   string         `json:"commitSha"`
	TriggerType string         `json:"triggerType"`
	Status      string         `gorm:"default:'queued'" json:"status"`
	StartedAt   *time.Time     `json:"startedAt"`
	FinishedAt  *time.Time     `json:"finishedAt"`
	LogsPath    string         `json:"logsPath"`
	ImageTag    string         `json:"imageTag"`
	ContainerID string         `json:"containerId"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

type EnvironmentVariable struct {
	ID             string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ProjectID      string    `gorm:"type:uuid;index" json:"projectId"`
	Project        Project   `gorm:"foreignKey:ProjectID" json:"-"`
	Key            string    `json:"key"`
	ValueEncrypted string    `json:"-"`
	CreatedAt      time.Time `json:"createdAt"`
	UpdatedAt      time.Time `json:"updatedAt"`
}

type ServerQuota struct {
	ID           string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	UserID       string    `gorm:"type:uuid;uniqueIndex" json:"userId"`
	User         User      `gorm:"foreignKey:UserID" json:"-"`
	CpuLimit     float64   `gorm:"default:0.5" json:"cpuLimit"`
	MemoryLimit  int       `gorm:"default:512" json:"memoryLimit"` // in MB
	StorageLimit int       `gorm:"default:1024" json:"storageLimit"` // in MB
	MaxProjects  int       `gorm:"default:3" json:"maxProjects"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type AuditLog struct {
	ID        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ActorID   string    `gorm:"type:uuid;index" json:"actorId"`
	ProjectID string    `gorm:"type:uuid;index" json:"projectId"`
	Action    string    `json:"action"`
	Metadata  string    `gorm:"type:jsonb" json:"metadata"`
	CreatedAt time.Time `json:"createdAt"`
}
